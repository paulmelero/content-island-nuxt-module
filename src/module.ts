import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  installModule,
  addComponent,
} from '@nuxt/kit'
import type { ModuleOptions } from './types'

// Module options TypeScript interface definition

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'content-island',
    configKey: 'contentIsland',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN,
    apiVersion: '1.0',
    domain: 'api.contentisland.net',
    mdc: {
      highlight: false,
      headings: {
        anchorLinks: false,
      },
    },
    markdownContentComponentClass: 'md-content',
  },
  async setup(options, nuxt) {
    // Skip when preparing
    if (nuxt.options._prepare) return

    const resolver = createResolver(import.meta.url)

    // Add the options to the public runtime config for the plugin
    nuxt.options.runtimeConfig.public.contentIsland ||= {}
    Object.assign(
      nuxt.options.runtimeConfig.public.contentIsland as ModuleOptions,
      {
        accessToken:
          options.accessToken || process.env.CONTENT_ISLAND_ACCESS_TOKEN,
        apiVersion: options.apiVersion,
        domain: options.domain,
        markdownContentComponentClass: options.markdownContentComponentClass,
      },
    )

    // Register `@nuxtjs/mdc` module
    await installModule('@nuxtjs/mdc', {
      highlight: options.mdc.highlight,
    })

    // Prevent Vite from alerting about missing dependencies
    nuxt.hook('vite:extendConfig', (viteInlineConfig, { isClient }) => {
      if (!isClient) return

      viteInlineConfig.optimizeDeps ||= {}
      viteInlineConfig.optimizeDeps.include ||= []

      const mdcDeps = [
        'remark-gfm',
        'remark-emoji',
        'remark-mdc',
        'remark-rehype',
        'rehype-raw',
        'parse5',
        'unist-util-visit',
        'unified',
        'debug',
      ]

      for (const dep of mdcDeps) {
        if (!viteInlineConfig.optimizeDeps.include.includes(dep)) {
          viteInlineConfig.optimizeDeps.include.push(dep)
        }
      }
    })

    // Add custom MDC wrapper component
    addComponent({
      name: 'MarkdownContent',
      filePath: resolver.resolve('runtime/components/MarkdownContent'),
    })

    // Register the content island SDK via plugin
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/content-island'))
  },
})

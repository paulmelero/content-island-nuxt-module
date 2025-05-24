import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import type { ModuleOptions } from "./types";

// Module options TypeScript interface definition

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "content-island",
    configKey: "contentIsland",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN,
    apiVersion: "1.0",
    domain: "api.contentisland.net",
  },
  setup(options, nuxt) {
    // Skip when preparing
    if (nuxt.options._prepare) return;

    const resolver = createResolver(import.meta.url);

    // Add the options to the public runtime config for the plugin
    nuxt.options.runtimeConfig.public.contentIsland ||= {};

    Object.assign(
      nuxt.options.runtimeConfig.public.contentIsland as ModuleOptions,
      {
        accessToken:
          options.accessToken || process.env.CONTENT_ISLAND_ACCESS_TOKEN,
        apiVersion: options.apiVersion,
        domain: options.domain,
      }
    );

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});

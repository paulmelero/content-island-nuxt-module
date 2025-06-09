import type { ModuleOptions as MDCModuleOptions } from '@nuxtjs/mdc'

export interface ModuleOptions {
  accessToken: string
  domain?: string
  apiVersion?: string
  mdc: Partial<MDCModuleOptions>
  markdownContentComponentClass?: 'md-content' | (string & {})
}

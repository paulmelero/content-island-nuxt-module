import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {
  accessToken?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "content-island",
    configKey: "contentIsland",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    accessToken: process.env.CONTENT_ISLAND_ACCESS_TOKEN,
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});

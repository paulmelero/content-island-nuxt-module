# Content Island - Nuxt Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module for Content Island - a headless CMS for Nuxt.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/content-island-nuxt-module?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- 🧭 &nbsp;Content Islands CMS integration
- 😌 &nbsp;Easy integration
- ⚡️ &nbsp;Fast and lightweight

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add content-island-nuxt-module
```

## Requirements

- This module requires Nuxt 3.0 or later.
- You need a Content Island account to use this module. You can sign up for free at [Content Island](https://contentisland.net/).
- You need to have a Content Island project set up and an API token to access your content.

## Usage

After installing the module, you can start using it in your Nuxt application.

### Configuration

You can configure the module in your `nuxt.config.ts` file. Here is an example configuration:

Add your API Token to your `.env` file. You can get the token from your Content Island dashboard.

```bash
# .env
CONTENT_ISLAND_ACCESS_TOKEN=
```

Then, you can configure the module in your `nuxt.config.ts` file:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["content-island"],
  contentIsland: {
    // Module options
    mdc: {
      // Choose a theme for code highlighting
      highlight: {
        theme: "material-theme-darker",
      },
    },
  },
});
```

In a Page component, you can use the `$contentIsland` composable to fetch content:

```vue
<template>
  <div>
    <h1>{{ content.title }}</h1>
    <MarkdownContent :value="content.Article"></MarkdownContent>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "~/types";

const { $contentIsland } = useNuxtApp();

const { data: content } = await useAsyncData(async () => {
  // Pass the type parameter for type inference and autocompletion
  const page = await $contentIsland.getContent<Article>(
    process.env.NUXT_PUBLIC_CONTENT_ID_TEST,
    // Content Type
    "Article"
  );

  return page;
});
</script>
```

### MDC

For rendering Markdown content, the Content Island Nuxt Module uses the [Nuxt MDC](https://github.com/nuxt-modules/mdc) module, which provides a powerful way to render Markdown content with syntax highlighting and other features.

Content Island provides a `MarkdownContent` component that you can use to easily render Markdown content. You can import it from the module or use it directly if you have auto-imports enabled. It's a wrapper around the `@nuxt/mdc` module's `MDC` component, which provides syntax highlighting and other features.

#### Syntax Highlighting

For syntax highlighting, you can use the `highlight` option in the module configuration. By default, it is disabled, but you can enable it by setting the `mdc.highlight` option to a config object handled by the `@nuxt/mdc` module. For example, you can set the theme for code highlighting:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["content-island"],
  contentIsland: {
    mdc: {
      highlight: {
        theme: "material-theme-darker",
      },
    },
  },
});
```

For a full list of available themes, you can check the [Shiki documentation](https://shiki.style/themes#bundled-themes).

You can see the full list of available config options for MDC in the [Nuxt MDC documentation](https://github.com/nuxt-modules/mdc?tab=readme-ov-file#configurations). Or the MDC Nuxt module options type in [MDC's `ModuleOptions` source code](https://github.com/nuxt-modules/mdc/blob/main/src/module.ts).

That's it! You can now use Content Island - Nuxt Module in your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/content-island-nuxt-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/content-island-nuxt-module
[npm-downloads-src]: https://img.shields.io/npm/dm/content-island-nuxt-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/content-island-nuxt-module
[license-src]: https://img.shields.io/npm/l/content-island-nuxt-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/content-island-nuxt-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com

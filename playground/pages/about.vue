<template>
  <div>
    <h1>About</h1>
    <p>{{ page.shorBio }}</p>
    <div v-html="page.extendedBio"></div>
  </div>
</template>

<script setup lang="ts">
import type { About } from "~/types";

const { $contentIsland } = useNuxtApp();

const { data: page } = await useAsyncData<About>(async () => {
  const page = await $contentIsland.getContent<About>(
    process.env.NUXT_PUBLIC_CONTENT_ID_TEST,
    "About" // contentType
  );

  return page;
  // return { ...page, extendedBio: transpileMarkdown(page.extendedBio) } as About;
});
</script>

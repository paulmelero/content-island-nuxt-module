<template>
  <div v-if="page">
    <h1>About</h1>
    <p>{{ page.shortBio }}</p>
    <MDC :value="page.extendedBio"></MDC>
  </div>
</template>

<script setup lang="ts">
import type { About } from "~/types";

const { $contentIsland } = useNuxtApp();

const { data: page } = await useAsyncData<About>(async () => {
  const page = await $contentIsland.getContent<About>(
    process.env.NUXT_PUBLIC_CONTENT_ID_TEST!, // id, hidden in .env for demonstration purposes
    "About" // contentType
  );

  return page;
});
</script>

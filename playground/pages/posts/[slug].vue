<template>
  <div
    class="container background"
    :style="`--postImage: url(${post?.image.link})`"
  >
    <article class="article" v-if="post">
      <header class="article__header">
        <p>
          <time :datetime="post.date">{{ post.date }}</time>
        </p>
        <h1 class="article__title">{{ post.title }}</h1>
      </header>

      <div v-html="post.content" class="article__content" />

      <footer>
        <p>
          Written by <strong>{{ post.author }}</strong>
        </p>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types";

const { $contentIsland } = useNuxtApp();

const route = useRoute();

const slug = route.params.slug as string;

const { data: post } = await useAsyncData<Post>(`post-${slug}`, async () => {
  const posts = await $contentIsland.getContentList<Post>("post");

  const foundPost = posts.find((post) => post.slug === slug);

  if (!foundPost) {
    throw createError({
      statusCode: 404,
      message: `Post with slug "${slug}" not found`,
    });
  }

  return foundPost;
});
</script>

<style scoped>
.background::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 360px;
  background-image: var(--postImage);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.article {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--space-2xl);
  padding: var(--space-lg);
  background-color: var(--pure-white);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.article__header {
  text-align: center;
}
.article__title {
  font-size: var(--fs-3xl);
  font-family: var(--ff-title);
}

:deep(.article__content) {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  h2 {
    margin-top: var(--space-sm);
  }
  ul {
    padding-left: var(--space-md);
  }
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 21/9;
    border-radius: var(--border-radius);
  }

  pre {
    max-width: 100%;
    overflow: auto;
  }

  code {
    font-size: var(--fs-xs);
    border-radius: var(--border-radius);
  }
}
</style>

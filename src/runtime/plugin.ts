import { createClient, mapContentToModel } from "@content-island/api-client";
import type { ModuleOptions } from "../types";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const { accessToken, domain, apiVersion } = config.public
    .contentIsland as ModuleOptions;

  if (!accessToken) {
    throw new Error(
      "Content Island token is not provided. Please set the" +
        " CONTENT_ISLAND_ACCESS_TOKEN environment variable or add it in the" +
        " nuxt.config under the `contentIsland.accessToken` option."
    );
  }

  const contentIslandClient = createClient({
    accessToken,
    domain,
    apiVersion,
  });

  /**
   * @see https://docs.contentisland.net/client-api/get-project/
   */
  const getProject = async () => contentIslandClient.getProject();

  /**
   * @see https://docs.contentisland.net/client-api/get-content/
   */
  const getContent = async <T extends unknown>(
    id: string,
    contentType: string
  ) => {
    const contentInfo = await contentIslandClient.getContent(id, {
      contentType,
    });

    return mapContentToModel<T & Parameters<typeof mapContentToModel>[0]>(
      contentInfo
    );
  };

  /**
   * @see https://docs.contentisland.net/client-api/get-content-list/
   */
  const getContentList = async <T extends unknown>(contentType: string) => {
    const content = await contentIslandClient.getContentList({ contentType });

    const contentList = content.map((contentInfo) => {
      return mapContentToModel<T & Parameters<typeof mapContentToModel>[0]>(
        contentInfo
      );
    });

    return contentList;
  };

  return {
    provide: {
      contentIsland: {
        client: contentIslandClient,
        getProject,
        getContent,
        getContentList,
      },
    },
  };
});

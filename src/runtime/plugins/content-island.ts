import { createClient, mapContentToModel } from '@content-island/api-client'

import type { ModuleOptions } from '../../types'
import { slugify } from '../lib/slugify'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const { accessToken, domain, apiVersion } = config.public
    .contentIsland as ModuleOptions

  if (!accessToken) {
    throw new Error(
      'Content Island token is not provided. Please set the'
      + ' CONTENT_ISLAND_ACCESS_TOKEN environment variable in a `.env` file'
      + ' in the root of your project OR add it in the'
      + ' nuxt.config file under the `contentIsland.accessToken` option.',
    )
  }

  const contentIslandClient = createClient({
    accessToken,
    domain,
    apiVersion,
  })

  /**
   * @see https://docs.contentisland.net/client-api/get-project/
   */
  const getProject = async () => contentIslandClient.getProject()

  /**
   * @see https://docs.contentisland.net/client-api/get-content/
   */
  const getContent = async <
    T extends {
      [k: string]: unknown
      slug?: string
    },
  >(
    id: string,
    contentType: string,
  ): Promise<T & { slug: string }> => {
    const contentInfo = await contentIslandClient.getContent(id, {
      contentType,
    })

    const toModel = mapContentToModel<
      T & Parameters<typeof mapContentToModel>[0]
    >(contentInfo)

    return {
      ...toModel,
      slug: toModel?.slug || slugify((toModel?.title || '') as string),
    }
  }

  /**
   * @see https://docs.contentisland.net/client-api/get-content-list/
   */
  const getContentList = async <
    T extends {
      [k: string]: unknown
      slug?: string
    },
  >(
    contentType: string,
  ): Promise<(T & { slug: string })[]> => {
    const content = await contentIslandClient.getContentList({ contentType })

    const contentList = content.map((contentInfo) => {
      const toModel = mapContentToModel<
        T & Parameters<typeof mapContentToModel>[0]
      >(contentInfo)

      return {
        ...toModel,
        slug: toModel?.slug || slugify((toModel?.title || '') as string),
      }
    })

    return contentList
  }

  return {
    provide: {
      contentIsland: {
        client: contentIslandClient,
        getProject,
        getContent,
        getContentList,
      },
    },
  }
})

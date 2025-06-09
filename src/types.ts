import type { RehypeHighlightOption } from "@nuxtjs/mdc";

export interface ModuleOptions {
  accessToken: string;
  domain?: string;
  apiVersion?: string;
  mdc: { highlight?: RehypeHighlightOption | false };
  markdownContentComponentClass?: "md-content" | (string & {});
}

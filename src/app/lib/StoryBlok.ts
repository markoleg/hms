import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/app/components/Page";

const token = process.env.NEXT_PUBLIC_SB_TOKEN;

export const components = {
  page: Page,
};

export const getStoryblokApi = storyblokInit({
  accessToken: token,
  use: [apiPlugin],
  components: components,
});

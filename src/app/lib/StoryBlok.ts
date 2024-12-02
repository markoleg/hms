import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/app/components/Page";
import Hero from "../components/Hero/Hero";
import Transcription from "../components/Transcription/Transcription";

const token = process.env.NEXT_PUBLIC_SB_TOKEN;

export const components = {
  page: Page,
  hero: Hero,
  transcription: Transcription,
};

export const getStoryblokApi = storyblokInit({
  accessToken: token,
  use: [apiPlugin],
  components: components,
});

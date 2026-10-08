import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";

export const revalidate = 2592000; // 30 days, content is refreshed on publish via /api/revalidate

async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "published",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams, {
    next: { revalidate: 2592000 },
  });
}

export default async function Home() {
  const { data } = await fetchData();

  return <StoryblokServerComponent blok={data.story.content} />;
}

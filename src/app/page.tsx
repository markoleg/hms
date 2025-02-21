import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";


async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams, {
    next: { revalidate: 3600 }, // ISR 
  });
}
export const dynamic = "force-static";
export const revalidate = 3600;

export default async function Home() {
  const { data } = await fetchData();
  const bridgeOptions = {
    resolveRelations: ["courses.courses"],
  };

  return <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />;
}

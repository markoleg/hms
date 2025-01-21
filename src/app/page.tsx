import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";

export const revalidate = 3600; // Set revalidate time here (1 hour)

async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  // Remove the revalidate option from fetch and rely on ISR through export
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}

export default async function Home() {
  const { data } = await fetchData();
  const bridgeOptions = {
    resolveRelations: ["courses.courses"],
  };

  return <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />;
}

import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";


async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "published",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}
export const revalidate = 3600;

export default async function Home() {
  const { data } = await fetchData();
  const bridgeOptions = {
    resolveRelations: ["courses.courses"],
  };

  return <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />;
}

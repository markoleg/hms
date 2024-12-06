import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";

export const dynamic = "force-dynamic";

async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams, {
    next: { revalidate: 30 },
  });
}
export default async function Home() {
  const { data } = await fetchData();
  const bridgeOptions = {
    resolveRelations: ["courses.courses"],
  };
  return <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />;
}

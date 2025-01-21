import {
  ISbStoriesParams,
  SbBlokData,
  StoryblokClient,
  StoryblokServerComponent,
} from "@storyblok/react/rsc";

import { getStoryblokApi } from "@/app/lib/StoryBlok";

export const revalidate = 3600;

const COMPONENTS = ["courses", "stats", "prices", "cta_section"];

async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams);
}

export default async function RepeatedComponents() {
  const { data } = await fetchData();
  const repeatedComponents: SbBlokData[] = [];
  data.story.content.body.map((component: { component: string }) => {
    if (COMPONENTS.includes(component.component)) {
      repeatedComponents.push(component);
    }
  });
  return (
    <>
      {repeatedComponents.map((component: any) => (
        <StoryblokServerComponent key={component._uid} blok={component} />
      ))}
    </>
  );
}

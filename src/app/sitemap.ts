import { MetadataRoute } from "next";
import { StoryblokClient, ISbStoriesParams } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";
import { BASEURL } from "./lib/Constants";

export const revalidate = 3600;

async function fetchData() {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
    per_page: 100,
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/links`, sbParams);
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await fetchData();
  const urls = Object.values(data.data.links)
    .filter((item: any) => !item.is_folder) // Фільтруємо об'єкти, де is_folder=false
    .map((item: any) => ({
      url: `${BASEURL}${item.real_path}`,
      lastModified: new Date().toISOString(),
    }));

  return urls;
}

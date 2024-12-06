import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";
import { notFound } from "next/navigation";

// export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string[] }>;

export async function generateStaticParams() {
  const courses = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home/?version=draft&token=${process.env.NEXT_PUBLIC_SB_TOKEN}&resolve_relations=courses.courses`
  ).then((res) => res.json());

  const slugs = courses.rels.map((course: any) => ({
    slug: course.full_slug.split("/").slice(1),
  }));
  const staticParams = [...slugs];

  return staticParams;
}
async function fetchData(slug: string) {
  let sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/courses/${slug}`, sbParams, {
    next: { revalidate: 30 },
  });
}
export default async function CoursePage({ params }: { params: Params }) {
  const pageParams = await params;
  const slug = pageParams.slug.join("/");

  try {
    const { data } = await fetchData(slug);
    const bridgeOptions = {
      resolveRelations: ["courses.courses"],
    };

    return <StoryblokStory story={data.story} bridgeOptions={bridgeOptions} />;
  } catch (e) {
    console.error(e);
    return notFound();
  }
}

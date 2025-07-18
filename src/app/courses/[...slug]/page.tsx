import {
  StoryblokClient,
  ISbStoriesParams,
  StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";
import { notFound } from "next/navigation";
import { Metadata } from "next";


export const revalidate = 86400; // 24 hours

type CoursePageParams = Promise<{ slug: string[] }>;

export async function generateStaticParams() {
  const courses = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/home/?version=published&token=${process.env.NEXT_PUBLIC_SB_TOKEN}&resolve_relations=courses.courses`
  ).then((res) => res.json());

  const slugs = courses.rels.map((course: any) => ({
    slug: course.full_slug.split("/").slice(1), //remove 'course/'
  }));
  const staticParams = [...slugs];

  return staticParams;
}

export async function generateMetadata({
  params,
}: {
  params: CoursePageParams;
}) {
  const pageParams = await params;
  const slug = pageParams.slug.join("/");
  const courseData = await fetch(
    `https://api.storyblok.com/v2/cdn/stories/courses/${slug}/?version=published&token=${process.env.NEXT_PUBLIC_SB_TOKEN}`);
  const course = await courseData.json();

  const metadata: Metadata = {
    title: course.story.content.seo_title ? `HMS | ${course.story.content.seo_title}` : `HMS | ${course.story.content.title}`,
    description: course.story.content.seo_description,
    openGraph: {
      images: course.story.content.seo_image?.filename,
    },
    alternates: {
      canonical: `/courses/${slug}`,
    },
  };
  return metadata;
}
async function fetchData(slug: string) {
  let sbParams: ISbStoriesParams = {
    version: "published",
    resolve_relations: ["courses.courses"],
  };

  const storyblokApi: StoryblokClient = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/courses/${slug}`, sbParams, {
    next: { revalidate: 86400 }, // cache for 24 hours
  });
}
export default async function CoursePage({
  params,
}: {
  params: CoursePageParams;
}) {
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

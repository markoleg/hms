import {
    StoryblokClient,
    ISbStoriesParams,
    StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "HMS | Політика конфіденційності",
    description: "Опис методів, які використовуються для збору, зберігання та використання інформації, що стосується осіб, котрі відвідують сайт",
};

async function fetchData() {
    let sbParams: ISbStoriesParams = {
        version: "draft",
    };
    const storyblokApi: StoryblokClient = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/privacy-policy`, sbParams);
}

export default async function PrivacyPolicy() {
    const { data } = await fetchData();

    return <StoryblokStory story={data.story} />;
}

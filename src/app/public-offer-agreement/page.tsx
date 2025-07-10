import {
    StoryblokClient,
    ISbStoriesParams,
    StoryblokStory,
} from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/app/lib/StoryBlok";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "HMS | Публічний договір про надання послуг",
    description: "Договір оферти",
};

async function fetchData() {
    let sbParams: ISbStoriesParams = {
        version: "published",
    };
    const storyblokApi: StoryblokClient = getStoryblokApi();
    return storyblokApi.get(`cdn/stories/public-offer-agreement`, sbParams);
}

export default async function PublicOfferAgreement() {
    const { data } = await fetchData();

    return <StoryblokStory story={data.story} />;
}

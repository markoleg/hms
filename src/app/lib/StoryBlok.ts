import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import Page from "@/app/components/Page";
import Hero from "../components/Hero/Hero";
import Transcription from "../components/Transcription/Transcription";
import Highlights from "../components/Highlights/Highlights";
import Benefits from "../components/Benefits/Benefits";
import Courses from "../components/Courses/Courses";
import CoursePage from "../components/Course";
import Stats from "../components/Stats/Stats";
import Prices from "../components/Prices/Prices";
import PlansDescription from "../components/PlansDescription/PlansDescription";
import Feedbacks from "../components/Feedbacks/Feedbacks";
import CtaSection from "../components/CtaSection/CtaSection";
import Faq from "../components/FAQ/Faq";

import CourseHero from "../components/CoursePage/CourseHero/CourseHero";
import CourseAbout from "../components/CoursePage/CourseAbout/CourseAbout";

const token = process.env.NEXT_PUBLIC_SB_TOKEN;

export const components = {
  page: Page,
  course: CoursePage,
  hero: Hero,
  transcription: Transcription,
  highlights: Highlights,
  benefits: Benefits,
  courses: Courses,
  stats: Stats,
  prices: Prices,
  plans_description: PlansDescription,
  feedbacks: Feedbacks,
  cta_section: CtaSection,
  faq: Faq,
  // course page components
  course_hero: CourseHero,
  course_about: CourseAbout,
};

export const getStoryblokApi = storyblokInit({
  accessToken: token,
  use: [apiPlugin],
  components: components,
});

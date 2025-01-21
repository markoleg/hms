import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import RepeatedComponents from "./CoursePage/RepeatedComponents";

const CoursePage = ({ blok }: { blok: any }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body &&
      blok.body.map((nestedBlok: any) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    <RepeatedComponents />
    {blok.bottom &&
      blok.bottom.map((nestedBlok: any) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default CoursePage;

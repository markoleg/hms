import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

const Page = ({ blok }: { blok: any }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;

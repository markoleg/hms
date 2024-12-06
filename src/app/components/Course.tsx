import { storyblokEditable } from "@storyblok/react/rsc";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

const CoursePage = ({ blok }: { blok: any }) => (
  <main {...storyblokEditable(blok)}>
    <div className="container">
      <h1 style={{ marginTop: "50px" }}>{blok.title}</h1>
    </div>
    {blok.body ??
      blok.body.map((nestedBlok: any) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default CoursePage;

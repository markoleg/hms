import { storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

export function RichTextFullpage({ blok }: { blok: any }) {
    return (
        <article className="policy">
            <div className="container">
                <div {...storyblokEditable(blok)}>
                    {render(blok.text)}
                </div>
            </div>
        </article>
    );
}
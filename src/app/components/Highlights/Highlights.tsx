import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";
import styles from "./Highlights.module.css";
export default function Highlights({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        {render(blok.title)}
        <div className={styles.subtitle}>{render(blok.subtitle)}</div>
      </div>
      <div className={styles.hl_inner_section}>
        <div className="container">
          <div className={styles.highlights_wrp}>
            {blok.cards.map((highlight: any) => (
              <div
                key={highlight.uid}
                className={styles.card}
                {...storyblokEditable(highlight)}
              >
                <Image
                  src={highlight.icon.filename}
                  width={50}
                  height={50}
                  alt="Іконка"
                />
                <div>{render(highlight.text)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

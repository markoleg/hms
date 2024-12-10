import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import styles from "./CourseHero.module.css";

import CTA from "@/app/components/CTA/CTA";
import { render } from "storyblok-rich-text-react-renderer";

export default function CourseHero({ blok }: { blok: any }) {
  return (
    <section className={styles.hero_section} {...storyblokEditable(blok)}>
      <div className={styles.container}>
        <div className={styles.hero_wrp}>
          <div className={styles.hero_inner}>
            <h1>{blok.heading}</h1>
            <div className={styles.subheading}>{render(blok.subheading)}</div>
            <CTA>Безкоштовне пробне заняття</CTA>
          </div>
          <div className={styles.img_wrp}>
            <Image
              src={blok.image.filename}
              width={566}
              height={529}
              alt={blok.heading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

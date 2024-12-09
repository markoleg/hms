import { render } from "storyblok-rich-text-react-renderer";
import styles from "./CtaSection.module.css";
import CTA from "../CTA/CTA";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

export default function CtaSection({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        <div className={styles.cta_wrp}>
          <div className={styles.inner}>
            <h2 className={styles.text}>{render(blok.text)}</h2>
            <CTA>Спробувати безкоштовно</CTA>
          </div>
          <Image
            src={blok.image.filename}
            width={410}
            height={340}
            alt={blok.image.alt}
          />
        </div>
      </div>
    </section>
  );
}

import { storyblokEditable } from "@storyblok/react";
import styles from "./Hero.module.css";
import Image from "next/image";
import CTA from "../CTA/CTA";

export default function Hero({ blok }: { blok: any }) {
  return (
    <section className={styles.hero_section} {...storyblokEditable(blok)}>
      <div className={styles.container}>
        <div className={styles.hero_wrp}>
          <div className={styles.hero_inner}>
            {blok.title != "" ? (
              <h1>{blok.title}</h1>
            ) : (
              <h1>
                Make Your English{" "}
                <span className={styles.word}>
                  <span className={styles.letter}>G</span>reat
                </span>{" "}
                Again
              </h1>
            )}
            <CTA>Безкоштовне пробне заняття</CTA>
          </div>
          <div className={styles.img_wrp}>
            <Image
              src={blok.hero_img.filename}
              width={566}
              height={529}
              alt={blok.hero_img.alt}
            />
          </div>
          <div className={styles.trump}>
            <Image
              src="/trumppumpum.png"
              width={980}
              height={599}
              alt="Трамп"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

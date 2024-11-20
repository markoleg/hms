import { storyblokEditable } from "@storyblok/react";
import styles from "./Hero.module.css";

export default function Hero({ blok }: { blok: any }) {
  return (
    <section className={styles.hero_section} {...storyblokEditable(blok)}>
      <div className="container">
        <div className={styles.hero_wrp}>
          <span className={styles.logo}>HMS</span>
          <small> Heorhii Mynko School</small>
          <br />
          <h1 className={styles.hero_title}>{blok.title}</h1>
        </div>
      </div>
    </section>
  );
}

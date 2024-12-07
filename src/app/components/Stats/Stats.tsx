import { storyblokEditable } from "@storyblok/react";
import styles from "./Stast.module.css";
import Image from "next/image";

export default function Stats({ blok }: { blok: any }) {
  return (
    <section {...storyblokEditable(blok)}>
      <div className="container">
        <div className={styles.stats_wrp}>
          <div className={styles.cards_wrp}>
            {blok.cards.map(
              (card: { number: string; text: string; uid: string }) => (
                <div key={card.uid} className={styles.stats_card}>
                  <p className={styles.num}>{card.number}</p>
                  <p>{card.text}</p>
                </div>
              )
            )}
          </div>
          <div className={styles.img}>
            <Image
              src={blok.image.filename}
              width={471}
              height={642}
              alt={blok.image.alt}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

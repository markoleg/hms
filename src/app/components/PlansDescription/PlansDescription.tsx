import {
  ISbAlternateObject,
  ISbRichtext,
  SbBlokData,
  storyblokEditable,
} from "@storyblok/react/rsc";
import styles from "./PlansDescription.module.css";
import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";
import CTA from "../CTA/CTA";

interface IPlanDescription extends SbBlokData {
  name: string;
  description: ISbRichtext;
  image: any;
  color: {
    uid: string;
    color: string;
    plugin: string;
  };
}

interface IPlansDescription extends SbBlokData {
  icon: any;
  title: ISbRichtext;
  bloks: IPlanDescription[];
}

export default function PlansDescription({
  blok,
}: {
  blok: IPlansDescription;
}) {
  return (
    <section {...storyblokEditable(blok)} className={styles.section}>
      <div className="container">
        <div className={styles.head_wrp}>
          <Image
            src={blok.icon.filename}
            width={60}
            height={60}
            alt={blok.icon.alt}
          />
          <h2>{render(blok.title)}</h2>
        </div>
        <div className={styles.cards_wrp}>
          {blok.bloks.map((card: IPlanDescription) => (
            <div
              className={styles.card}
              style={{ background: `${card.color.color}` }}
              {...storyblokEditable(card)}
            >
              <Image
                src={card.image.filename}
                width={100}
                height={100}
                alt={`${card.name} іконка`}
              />
              <h3>{card.name}</h3>
              {render(card.description)}
            </div>
          ))}
        </div>
        <CTA>Спробувати безкоштовно</CTA>
      </div>
    </section>
  );
}

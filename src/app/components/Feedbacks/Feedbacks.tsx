"use client";
import { render } from "storyblok-rich-text-react-renderer";
import styles from "./Feedbacks.module.css";
import "./Feedbacks.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { storyblokEditable } from "@storyblok/react";

export default function Feedbacks({ blok }: { blok: any }) {
  return (
    <section
      className={styles.section}
      {...storyblokEditable(blok)}
      id="feedbacks"
    >
      <div className="container">
        <div className={styles.head_wrp}>
          <h2>{render(blok.title)}</h2>
          {blok.icon.filename && (
            <Image
              src={blok.icon.filename}
              width={38}
              height={31}
              alt={blok.icon.alt}
            />
          )}
        </div>
        <div className="feedbacks_swiper">
          <Swiper
            className={styles.feedbacks_cards}
            slidesPerView={"auto"}
            navigation // Enable navigation
            modules={[Navigation]}
            spaceBetween={20}
          >
            {blok.feedbacks_cards.map((card: any, index: number) => (
              <SwiperSlide
                className={styles.card}
                key={index}
                {...storyblokEditable(card)}
              >
                <div className={styles.card_top}>
                  <Image
                    src={card.avatar.filename}
                    width={56}
                    height={56}
                    alt={card.name}
                  />
                  <p>{card.name}</p>
                </div>
                <div className={styles.feedback_txt}>
                  {render(card.feedback)}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

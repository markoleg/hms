"use client";
import { render } from "storyblok-rich-text-react-renderer";
import styles from "./Feedbacks.module.css";
import "./Feedbacks.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

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
                {card.link?.url && (
                  <Link
                    href={card.link?.url || "#"}
                    title="Instagram"
                    target="_blank"
                    className={styles.inst}
                  >
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20px"
                      height="20px"
                      viewBox="0 0 169.063 169.063"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
		c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
		c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
		c17.455,0,31.656,14.201,31.656,31.655V122.407z"
                        />
                        <path
                          d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
		C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
		c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"
                        />
                        <path
                          d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
		c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
		C135.661,29.421,132.821,28.251,129.921,28.251z"
                        />
                      </g>
                    </svg>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

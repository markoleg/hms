"use client";
import { storyblokEditable } from "@storyblok/react";
import styles from "./Prices.module.css";
import { render } from "storyblok-rich-text-react-renderer";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";

export default function Prices({ blok }: { blok: any }) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideTo = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };
  return (
    <section
      {...storyblokEditable(blok)}
      id="prices"
      className={styles.section}
    >
      <div className="container">
        <h2>{blok.title}</h2>
        <div className={styles.prices_wrp}>
          <div className={styles.pagination}>
            {blok.prices.map((el: any, index: number) => (
              <div
                key={index}
                className={`${styles.paginationButton} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => slideTo(index)}
              >
                {el.name}
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14.5"
                    cy="14.5"
                    r="14.5"
                    fill="var(--main-color)"
                  />
                  <path
                    d="M22.6684 15.845C23.2542 15.2592 23.2542 14.3094 22.6684 13.7236L13.1225 4.1777C12.5367 3.59191 11.5869 3.59191 11.0012 4.1777C10.4154 4.76349 10.4154 5.71323 11.0012 6.29902L19.4864 14.7843L11.0012 23.2696C10.4154 23.8554 10.4154 24.8051 11.0012 25.3909C11.5869 25.9767 12.5367 25.9767 13.1225 25.3909L22.6684 15.845ZM7.96069 16.2843H21.6078V13.2843H7.96069V16.2843Z"
                    fill="var(--snd-color)"
                  />
                </svg>
              </div>
            ))}
          </div>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {blok.prices.map((price_board: any, index: number) => (
              <SwiperSlide key={index} className={styles.prices_board}>
                {price_board.plans.map((plan: any, index_inner: number) => (
                  <div
                    key={index_inner}
                    {...storyblokEditable(plan)}
                    className={styles.plan_card}
                  >
                    <div
                      style={{ background: `${plan.color}` }}
                      className={styles.plan_title}
                    >
                      {render(plan.name)}
                    </div>
                    <div className={styles.prices}>
                      <div className={styles.teacher_wrp}>
                        <p className={styles.teacher_label}>teacher Pro</p>
                        <p>{plan.pro}</p>
                      </div>
                      <div className={styles.divider}></div>
                      <div className={styles.teacher_wrp}>
                        <p className={styles.teacher_label}>teacher Pro+</p>

                        <p>{plan.pro_plus}</p>
                      </div>
                    </div>
                    {render(plan.gift)}
                    {plan.gift2 && (
                      <div className={styles.add_gift}>
                        <div
                          className={styles.gift_num}
                          style={{ background: `${plan.color}` }}
                        >
                          +{plan.gift2_num}
                        </div>
                        {render(plan.gift2)}
                      </div>
                    )}
                  </div>
                ))}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

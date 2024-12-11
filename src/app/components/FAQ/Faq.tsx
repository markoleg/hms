"use client";
import { useState } from "react";
import styles from "./Faq.module.css";
import { ISbRichtext, storyblokEditable } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

export default function Faq({ blok }: { blok: any }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const faqItems = showAll ? blok.items : blok.items.slice(0, 10);
  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className={styles.faqSection} {...storyblokEditable(blok)}>
      <div className="container">
        <h2 className={styles.faqTitle}>{blok.title}</h2>
        <div className={styles.faqList}>
          {faqItems.map(
            (
              item: { question: string; answer: ISbRichtext },
              index: number
            ) => (
              <div
                key={index}
                {...storyblokEditable(item)}
                className={`${styles.faqItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(index)}
                >
                  {item.question}

                  <svg
                    className={`${styles.icon} ${
                      activeIndex === index ? styles.open : ""
                    }`}
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
                    ></circle>
                    <path
                      d="M22.6684 15.845C23.2542 15.2592 23.2542 14.3094 22.6684 13.7236L13.1225 4.1777C12.5367 3.59191 11.5869 3.59191 11.0012 4.1777C10.4154 4.76349 10.4154 5.71323 11.0012 6.29902L19.4864 14.7843L11.0012 23.2696C10.4154 23.8554 10.4154 24.8051 11.0012 25.3909C11.5869 25.9767 12.5367 25.9767 13.1225 25.3909L22.6684 15.845ZM7.96069 16.2843H21.6078V13.2843H7.96069V16.2843Z"
                      fill="var(--snd-color)"
                    ></path>
                  </svg>
                </div>
                <div className={styles.faqAnswer}>{render(item.answer)}</div>
              </div>
            )
          )}
        </div>
        {!showAll && blok.items.length > 10 ? (
          <button className="cta" onClick={() => setShowAll(true)}>
            {blok.more_button_text}
          </button>
        ) : null}
      </div>
    </section>
  );
}

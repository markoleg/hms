"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Benefits.module.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Benefits({ blok }: { blok: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const section = sectionRef.current;

    // Використовуємо ScrollTrigger.matchMedia для анімацій залежно від ширини екрана
    ScrollTrigger.matchMedia({
      "(min-width: 915px)": function () {
        gsap.to(cardsRef.current, {
          y: 0, // Рух на місце
          opacity: 1,
          stagger: 0.2,
          duration: 1,

          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom 50%",
            // end: "+=2000s 50%",
            // pin: section,
            // scrub: true,
            markers: false,
          },
        });
      },

      "(max-width: 914px)": function () {
        // Вимкнення ScrollTrigger для мобільних
        // ScrollTrigger.killAll();
        gsap.to(cardsRef.current, {
          x: 0, // Рух на місце
          stagger: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "10% center",
            end: "80% center",
            scrub: true,
            markers: false,
          },
        });
      },
    });

    // Очищення ефектів при розмонтуванні компонента
    return () => ScrollTrigger.clearMatchMedia();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        <div className={styles.benefits_wrp}>
          <div className={styles.cards_wrp}>
            {blok.cards.map((card: any, index: number) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={styles.card}
                style={{ "--index": index + 1 } as React.CSSProperties}
              >
                <h3>{card.heading}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
          <Image
            src={blok.image.filename}
            height={500}
            width={500}
            alt="Переваги школи"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}

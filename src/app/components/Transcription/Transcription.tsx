"use client";
import { storyblokEditable } from "@storyblok/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Transcription.module.css";

export default function Transcription({ blok }: { blok: any }) {
  useGSAP(() => {
    const body = document.querySelector("body");
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".tl",
      { x: 0 },
      {
        x: -500,
        scrollTrigger: {
          trigger: body,
          start: "top 20%",
          end: "bottom 18%",
          scrub: true,
          markers: false,
        },
      }
    );
  });
  return (
    <section {...storyblokEditable(blok)} className={styles.trans_section}>
      <div className="tl">
        <span>{blok.text}</span>
        <span>{blok.text}</span>
        <span>{blok.text}</span>
        <span>{blok.text}</span>
      </div>
    </section>
  );
}

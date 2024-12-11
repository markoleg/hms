import { storyblokEditable } from "@storyblok/react";
import styles from "./CourseAbout.module.css";
import Image from "next/image";
import { render } from "storyblok-rich-text-react-renderer";

export default function CourseAbout({ blok }: { blok: any }) {
  return (
    <section className={styles.section} {...storyblokEditable(blok)}>
      <div className="container">
        <h2>{blok.title}</h2>
        <div className={styles.wrp}>
          {blok.course_goals && (
            <div className={styles.goals_wrp}>
              {blok.course_goals.map((item: any, index: number) => (
                <div
                  key={index}
                  className={styles.goal}
                  {...storyblokEditable(item)}
                >
                  <div className={styles.num}>0{index + 1}</div>
                  <div>{render(item.text)}</div>
                </div>
              ))}
            </div>
          )}
          {blok.pie_chart && (
            <div className={styles.img_wrp}>
              <Image
                src={blok.pie_chart.filename}
                width={500}
                height={500}
                alt="Структура курсу"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

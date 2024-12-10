"use client";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import "swiper/css/free-mode";

// import "react-tabs/style/react-tabs.css";

import "./Courses.css";
import styles from "./Courses.module.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { render } from "storyblok-rich-text-react-renderer";
import { storyblokEditable } from "@storyblok/react";

export default function Courses({ blok }: { blok: any }) {
  const tags: string[] = Array.from(
    new Set(blok.courses.map((course: any) => course.tag_list[0]))
  );
  return (
    <section
      className={styles.section}
      {...storyblokEditable(blok)}
      id="courses"
    >
      <div className="container">
        <h2>{blok.title}</h2>
      </div>

      <Tabs>
        <div className={styles.tabs_btns_wrp}>
          <TabList>
            {tags.map((tag: string) => (
              <Tab key={tag}>{tag}</Tab>
            ))}
          </TabList>
        </div>
        <div className="container">
          {tags.map((tag) => {
            return (
              <TabPanel
                key={tag}
                id={tag}
                className={styles.tab_wrp}
                forceRender={true}
              >
                <Swiper
                  slidesPerView={"auto"}
                  slidesPerGroup={1}
                  spaceBetween={20}
                  // freeMode={{ enabled: true }}
                  navigation // Enable navigation
                  modules={[Navigation]}
                  breakpoints={{
                    900: {
                      slidesPerGroup: 3,
                      // freeMode: { enabled: false },
                    },
                  }}
                >
                  {blok.courses.map((course: any, index: number) => {
                    if (course.tag_list[0] === tag) {
                      return (
                        <SwiperSlide key={index}>
                          <Link
                            href={`${course.full_slug}`}
                            className={styles.card}
                          >
                            <Image
                              src={course.content.icon.filename}
                              width={52}
                              height={52}
                              alt={course.content.title}
                            />
                            <h3>{course.content.title}</h3>
                            {render(course.content.description)}
                            <div className={styles.card_btn}>
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
                              детальніше
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </TabPanel>
            );
          })}
        </div>
      </Tabs>
    </section>
  );
}

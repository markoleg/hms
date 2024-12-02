"use client";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const menu = document.querySelector("#menu");
    const burger = document.querySelector("#brg");
    if (isMenuOpen) {
      menu?.classList.add(`${styles.nav_show}`);
      burger?.classList.add(`${styles.brg_open}`);
    } else {
      menu?.classList.remove(`${styles.nav_show}`);
      burger?.classList.remove(`${styles.brg_open}`);
    }
  }, [isMenuOpen]);
  useEffect(() => {
    const menu = document.querySelector("#menu");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 50 &&
        !menu?.classList.contains(`${styles.nav_show}`)
      ) {
        // Скрол вниз
        setIsHeaderVisible(false);
      } else {
        // Скрол вверх
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <header
      className={`${styles.header} ${
        isHeaderVisible ? styles.header_visible : styles.header_hidden
      }`}
    >
      {" "}
      <div className="container">
        <div className={styles.header_wrp}>
          <Link href="/" className={styles.brand}>
            Heorhii Mynko School
          </Link>
          <div className={styles.brg} id="brg" onClick={openMenu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.nav_wrp} id="menu">
            <nav className={styles.nav}>
              <Link href="#">Курси</Link>
              <Link href="#">Ціни</Link>
              <Link href="#">Відгуки</Link>
            </nav>
            <Link href="#" className={styles.button}>
              Пробне заняття
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

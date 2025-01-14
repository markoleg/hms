"use client";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Modal from "../Modal/Modal";
import Image from "next/image";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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

  // debugging inst and tg browsers ios
  useEffect(() => {
    const svh = window.visualViewport?.height;
    document.documentElement.style.setProperty("--svh", `${svh}px`);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${
          isHeaderVisible ? styles.header_visible : styles.header_hidden
        }`}
      >
        <div className="container">
          <div className={styles.header_wrp}>
            <Link href="/" className={styles.brand}>
              <Image
                src="/HMS-лого.png"
                width={558}
                height={162}
                alt="logo"
                className={styles.logo}
              />
            </Link>
            <div className={styles.brg} id="brg" onClick={openMenu}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            {/* {ua} */}
            <div className={styles.nav_wrp} id="menu">
              <nav className={styles.nav} onClick={() => setIsMenuOpen(false)}>
                <Link href="#courses">Курси</Link>
                <Link href="#prices">Ціни</Link>
                <Link href="/#feedbacks">Відгуки</Link>
              </nav>
              <button className={styles.button} onClick={() => openModal()}>
                Пробне заняття
              </button>
            </div>
          </div>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

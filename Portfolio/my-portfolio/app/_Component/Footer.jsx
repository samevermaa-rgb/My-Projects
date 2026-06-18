// app/_Component/Footer.jsx

"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Blur Effects */}
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>

      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.brandSection}>
          <h2 className={styles.logo}>
            <span>S</span>ameer
          </h2>

          <p className={styles.description}>
            MERN Stack Developer focused on building modern,
            scalable and user-friendly web applications with
            clean UI and powerful backend systems.
          </p>
        </div>

        {/* Navigation */}
        <div className={styles.linksSection}>
          <h3>Navigation</h3>

          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.contactSection}>
          <h3>Contact</h3>

          <p>Email: varmasameer1980@gmai.com</p>
          <p>Location: India</p>

          <div className={styles.socials}>
            <a href="#">GitHub</a>
            <a href="https://www.linkedin.com/in/sameer-verma-484311402/">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottomBar}>
        <p>
          © 2026 Sameer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
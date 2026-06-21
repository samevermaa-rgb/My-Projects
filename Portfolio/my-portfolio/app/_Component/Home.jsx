// app/_Component/Home.jsx

"use client";

import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section className={styles.hero}>
      {/* Background Blur Effects */}
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>

      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.content}>
          <p className={styles.subTitle}>🚀 MERN Stack Developer</p>

          <h1 className={styles.title}>
            Hi, I'm <span>Sameer</span>
          </h1>

          <h2 className={styles.role}>
            Full Stack Web Developer
          </h2>

          <p className={styles.description}>
           MERN Stack Developer | AI-powered Web Application Builder | Passionate about creating modern full-stack applications and learning new technologies.
          </p>

          {/* CTA Buttons */}
          <div className={styles.buttonGroup}>
            <Link href="/projects" className={styles.primaryBtn}>
              View Projects
            </Link>

            <a
              href="/sameer-resume.pdf "
              download
              className={styles.secondaryBtn}
            >
              Download Resume
            </a>

            <Link href="/contact" className={styles.outlineBtn}>
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right Side Card */}
        <div className={styles.card}>
          <div className={styles.cardGlow}></div>

          <div className={styles.cardContent}>
            <h3>MERN Stack</h3>

            <div className={styles.techGrid}>
              <span>MongoDB</span>
              <span>Express.js</span>
              <span>React.js</span>
              <span>Node.js</span>
              <span>Next.js</span>
              <span>Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
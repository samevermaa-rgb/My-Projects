// app/_Component/About.jsx

"use client";

import styles from "./About.module.css";
import Navbar from "../_Component/Navbar"
import Footer from "../_Component/Footer"

export default function About() {
  return (
    <section className={styles.about}>
      <Navbar/>
     
      {/* Blur Effects */}
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>
      

      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.headingSection}>
          <p className={styles.subTitle}>About Me</p>

          <h1 className={styles.title}>
            Passionate About Building
            <span> Modern Web Experiences</span>
          </h1>

          <p className={styles.description}>
            MERN Stack Developer | AI-powered Web Application Builder | Passionate about creating modern full-stack applications and learning new technologies.
          </p>
        </div>

        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Who I Am */}
          <div className={styles.card}>
            <h2>Who I Am</h2>

            <p>
              I am a MERN Stack Developer who enjoys turning ideas into real-world web applications. I use AI tools and modern development technologies to build websites faster and improve productivity while maintaining quality and functionality.
            </p>

            <p>
             My main focus is creating modern, responsive, and user-friendly web applications with clean code and optimized performance. By combining AI-assisted workflows with full-stack development, I can speed up development processes, improve efficiency, and focus more on building practical and effective solutions. As a fresher, I continuously learn new technologies and work on projects that strengthen my skills in modern web development.
            </p>
          </div>

          {/* Technologies */}
          <div className={styles.card}>
            <h2>Technologies I Work With</h2>

            <div className={styles.techGrid}>
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>React.js</span>
              
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MongoDB</span>
            
              <span>Git & GitHub</span>
            </div>
          </div>

          {/* Website Types */}
          <div className={styles.card}>
            <h2>What I Can Build</h2>

            <ul className={styles.list}>
              <li>Modern Portfolio Websites</li>
              <li>Business Websites</li>
              <li>Admin Dashboards</li>
              <li>Blog Platforms</li>
              <li>E-Commerce Websites</li>
              <li>Authentication Systems</li>
              <li>REST API Based Applications</li>
              <li>Responsive Full Stack Web Apps</li>
            </ul>
          </div>

          {/* Learning Journey */}
          <div className={styles.card}>
            <h2>My Learning Journey</h2>

            <p>
              My web development journey started with learning HTML,
              CSS and JavaScript. After building frontend projects,
              I moved towards backend development using Node.js,
              Express.js and MongoDB.
            </p>

            <p>
              Currently, I am improving my skills in Next.js,
              API development, authentication systems and scalable
              full stack applications while building real-world projects.
            </p>
          </div>
        </div>
      </div>
       <Footer/>
    </section>
  );
}
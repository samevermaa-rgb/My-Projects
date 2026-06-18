// app/_Component/WelcomeScreen.jsx

"use client";

import { useEffect, useState } from "react";
import styles from "./WelcomeScreen.module.css";

export default function WelcomeScreen({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.screen}>
        {/* Background Blur */}
        <div className={styles.blurOne}></div>
        <div className={styles.blurTwo}></div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoGlow}></div>

            <h1 className={styles.logo}>
              <span>S</span>ameer
            </h1>
          </div>

          <p className={styles.role}>
            MERN Stack Developer
          </p>

          {/* Loader */}
          <div className={styles.loader}>
            <div className={styles.loaderBar}></div>
          </div>

          <p className={styles.loadingText}>
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
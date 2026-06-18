"use client";

import Link from "next/link";

import styles from "./Welcome.module.css";

export default function Welcome() {
  return (
    <section className={styles.welcome}>

      {/* Background Blur */}
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>

      {/* Main Content */}
      <div className={styles.container}>

        {/* Left Content */}
        <div className={styles.left}>

          <p className={styles.subTitle}>
            ADMIN PANEL
          </p>

          <h1 className={styles.title}>
            Manage Your
            <span> Dashboard</span>
          </h1>

          <p className={styles.description}>
            Securely manage users, blogs, analytics,
            projects, and all platform activities from
            one modern admin dashboard.
          </p>

          {/* Buttons */}
          <div className={styles.buttonGroup}>

            <Link
              href="/login"
              className={styles.loginBtn}
            >
              Login
            </Link>

            <Link
              href="/register"
              className={styles.signupBtn}
            >
              Sign Up
            </Link>

          </div>
        </div>

        {/* Right Content */}
        <div className={styles.right}>

          <div className={styles.card}>

            <div className={styles.cardHeader}>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
              <div className={styles.circle}></div>
            </div>

            <div className={styles.cardContent}>

              <div className={styles.statBox}>
                <h2>1.2K</h2>
                <p>Active Users</p>
              </div>

              <div className={styles.statBox}>
                <h2>350+</h2>
                <p>Projects</p>
              </div>

              <div className={styles.statBox}>
                <h2>98%</h2>
                <p>Success Rate</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
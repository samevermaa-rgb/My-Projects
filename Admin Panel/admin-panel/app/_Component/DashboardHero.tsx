"use client";

import {
  useEffect,
  useState
} from "react";

import styles from "./DashboardHero.module.css";

export default function DashboardHero() {

  const [
    projectCount,
    setProjectCount
  ] = useState(0);

  const [
    messageCount,
    setMessageCount
  ] = useState(0);

  useEffect(() => {

    const getDashboardData =
      async () => {

        try {

          const [
            projectResponse,
            messageResponse
          ] = await Promise.all([

            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/projects/count`
            ),

            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/messages/count`
            )

          ]);

          const projectData =
            await projectResponse.json();

          const messageData =
            await messageResponse.json();

          setProjectCount(
            projectData.totalProjects || 0
          );

          setMessageCount(
            messageData.totalMessages || 0
          );

        }

        catch(error){

          console.log(
            "Dashboard data error:",
            error
          );

        }

      };

    getDashboardData();

  }, []);

  return (

    <section
      className={styles.heroSection}
    >

      {/* LEFT CONTENT */}

      <div
        className={styles.leftContent}
      >

        <span
          className={styles.badge}
        >
          🚀 Developer Dashboard
        </span>

        <h1
          className={styles.heading}
        >
          Manage Your Projects &
          Messages
        </h1>

        <p
          className={styles.description}
        >
          Track your latest activities,
          manage client communications,
          and monitor project growth
          with a modern dashboard
          experience.
        </p>

        <div
          className={styles.buttonGroup}
        >

          {/* <button
            className={styles.primaryBtn} 
          >
            Create Project
          </button>

          <button
            className={styles.secondaryBtn}
          >
            View Analytics
          </button> */}

        </div>

      </div>

      {/* RIGHT STATS */}

      <div
        className={styles.statsContainer}
      >

        {/* PROJECTS CARD */}

        <div
          className={styles.statsCard}
        >

          <div
            className={styles.cardTop}
          >

            <div
              className={styles.iconBox}
            >
              🚀
            </div>

            <span
              className={styles.growth}
            >
              +15%
            </span>

          </div>

          <h2
            className={styles.statsNumber}
          >
            {projectCount}
          </h2>

          <p
            className={styles.statsLabel}
          >
            Total Projects
          </p>

          <div
            className={styles.progressBar}
          >

            <div
              className={styles.progressFill}
            ></div>

          </div>

        </div>

        {/* MESSAGES CARD */}

        <div
          className={styles.statsCard}
        >

          <div
            className={styles.cardTop}
          >

            <div
              className={styles.iconBox}
            >
              💬
            </div>

            <span
              className={styles.growth}
            >
              +8%
            </span>

          </div>

          <h2
            className={styles.statsNumber}
          >
            {messageCount}
          </h2>

          <p
            className={styles.statsLabel}
          >
            Total Messages
          </p>

          <div
            className={styles.progressBar}
          >

            <div
              className={`${styles.progressFill}
              ${styles.messageFill}`}
            ></div>

          </div>

        </div>

      </div>

    </section>

  );

}
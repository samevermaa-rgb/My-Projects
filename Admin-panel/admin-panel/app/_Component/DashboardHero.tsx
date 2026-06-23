"use client";

import {
  useEffect,
  useState
} from "react";

import { useRouter } from "next/navigation";

import styles from "./DashboardHero.module.css";

export default function DashboardHero() {
  const router = useRouter();

  const [projectCount, setProjectCount] = useState(0);

  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    // Not logged in
    if (!token) {
      router.push("/login");
      return;
    }

    // Not admin
    if (user?.role !== "admin") {
      router.push("/login");
      return;
    }

    const getDashboardData = async () => {
      try {
        const [
          projectResponse,
          messageResponse,
        ] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects/count`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/messages/count`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        // Invalid token
        if (
          projectResponse.status === 401 ||
          messageResponse.status === 401
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");

          return;
        }

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
      } catch (error) {
        console.log(
          "Dashboard data error:",
          error
        );
      }
    };

    getDashboardData();
  }, [router]);

  return (
    <section className={styles.heroSection}>

      {/* LEFT CONTENT */}
      <div className={styles.leftContent}>
        <span className={styles.badge}>
          🚀 Developer Dashboard
        </span>

        <h1 className={styles.heading}>
          Manage Your Projects & Messages
        </h1>

        <p className={styles.description}>
          Track your latest activities,
          manage client communications,
          and monitor project growth
          with a modern dashboard
          experience.
        </p>
      </div>

      {/* RIGHT STATS */}
      <div className={styles.statsContainer}>

        {/* PROJECTS CARD */}
        <div className={styles.statsCard}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>
              🚀
            </div>

            <span className={styles.growth}>
              +15%
            </span>
          </div>

          <h2 className={styles.statsNumber}>
            {projectCount}
          </h2>

          <p className={styles.statsLabel}>
            Total Projects
          </p>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
            ></div>
          </div>
        </div>

        {/* MESSAGES CARD */}
        <div className={styles.statsCard}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>
              💬
            </div>

            <span className={styles.growth}>
              +8%
            </span>
          </div>

          <h2 className={styles.statsNumber}>
            {messageCount}
          </h2>

          <p className={styles.statsLabel}>
            Total Messages
          </p>

          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${styles.messageFill}`}
            ></div>
          </div>
        </div>

      </div>

    </section>
  );
}
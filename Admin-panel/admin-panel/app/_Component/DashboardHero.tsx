"use client";

import {
  useEffect,
  useState
} from "react";

import { useRouter } from "next/navigation";

import styles from "./DashboardHero.module.css";

export default function DashboardHero() {

  const router = useRouter();

  const [
    projectCount,
    setProjectCount
  ] = useState(0);

  const [
    messageCount,
    setMessageCount
  ] = useState(0);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const user =
      JSON.parse(
        localStorage.getItem("user") || "null"
      );

    /* Not logged in */
    if (!token) {
      router.push("/login");
      return;
    }

    /* Not admin */
    if (user?.role !== "admin") {
      router.push("/login");
      return;
    }

    const getDashboardData =
      async () => {

        try {

          const [
            projectResponse,
            messageResponse
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
            )

          ]);

          /* Token invalid */
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

        }

        catch(error){

          console.log(
            "Dashboard data error:",
            error
          );

        }

      };

    getDashboardData();

  }, [router]);

  return (

    // Tumhara pura existing JSX same rahega
    // Neeche wala return bilkul waise hi rehne do

    <section className={styles.heroSection}>
      {/* Existing JSX */}
    </section>

  );

}
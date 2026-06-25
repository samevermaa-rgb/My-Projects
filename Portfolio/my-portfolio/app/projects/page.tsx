"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Navbar from "../_Component/Navbar";
import Footer from "../_Component/Footer";

import styles from "./Projects.module.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  screenshots: string[];
  technologies: string[];
  githubLink: string;
  liveLink: string;
  category: string;
  status: string;
}

export default function Projects() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
            
            {
              method: "GET",
              cache: "no-store",
              
            }
            
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch projects"
          );
        }

        const result =
          await response.json();

        setProjects(
          result?.data || []
        );

      } catch (error) {

        console.log(
          "Fetch Error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <>
      <Navbar />

      <section
        className={
          styles.projects
        }
      >
        <div
          className={
            styles.header
          }
        >
          <span>
            Portfolio
          </span>

          <h1>
            My Projects
          </h1>

          <p>
            Full-stack projects built
            with modern technologies
            and real-world functionality
          </p>
        </div>

        {loading && (
          <h2
            style={{
              textAlign: "center"
            }}
          >
            Loading...
          </h2>
        )}

        {error && (
          <h2
            style={{
              textAlign: "center",
              color: "red"
            }}
          >
            {error}
          </h2>
        )}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <h2
              style={{
                textAlign: "center"
              }}
            >
              No Projects Found
            </h2>
          )}

        {!loading &&
          !error &&
          projects.length > 0 && (

          <div
            className={
              styles.projectGrid
            }
          >
            {projects.map(
              (project) => (

                <div
                  key={
                    project._id
                  }
                  className={
                    styles.card
                  }
                >

                  <div
                    className={
                      styles.imageContainer
                    }
                  >

                    <Image
                      src={
                        project
                          .screenshots?.[0] ||
                        "/placeholder.jpg"
                      }
                      alt={
                        project.title
                      }
                      fill
                      className={
                        styles.image
                      }
                    />

                    <span
                      className={
                        styles.status
                      }
                    >
                      {
                        project.status
                      }
                    </span>

                  </div>

                  <div
                    className={
                      styles.content
                    }
                  >

                    <p
                      className={
                        styles.category
                      }
                    >
                      {
                        project.category
                      }
                    </p>

                    <h2>
                      {
                        project.title
                      }
                    </h2>

                    <p
                      className={
                        styles.description
                      }
                    >
                      {
                        project.description
                      }
                    </p>

                    <div
                      className={
                        styles.techStack
                      }
                    >
                      {project
                        .technologies
                        ?.map(
                          (
                            tech,
                            index
                          ) => (
                            <span
                              key={
                                index
                              }
                              className={
                                styles.tech
                              }
                            >
                              {
                                tech
                              }
                            </span>
                          )
                        )}
                    </div>

                    <div
                      className={
                        styles.buttons
                      }
                    >

                      {project.liveLink && (
                        <a
                          href={
                            project.liveLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </a>
                      )}

                      {project.githubLink && (
                        <a
                          href={
                            project.githubLink
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source Code
                        </a>
                      )}

                    </div>

                  </div>

                </div>

              )
            )}
          </div>

        )}

      </section>

      <Footer />
    </>
  );
}
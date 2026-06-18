"use client";
export const dynamic = "force-dynamic";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
} from "react";

import styles from "./projects.module.css";

export default function ProjectsPage() {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      category: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveLink: "",
      status: "Completed",
    });

  const [screenshots, setScreenshots] =
    useState<File[]>([]);

  /* Input change */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  /* Images */

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(
      e.target.files
    );

    if (files.length > 5) {
      alert(
        "You can upload maximum 5 screenshots"
      );

      return;
    }

    setScreenshots(files);
  };

  /* Submit */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      /* Validation */

      if (
        !formData.title ||
        !formData.description
      ) {

        alert(
          "Please fill required fields"
        );

        setLoading(false);

        return;
      }

      if (
        screenshots.length > 5
      ) {

        alert(
          "Maximum 5 screenshots allowed"
        );

        setLoading(false);

        return;
      }

      const token =
        localStorage.getItem(
          "token"
        );

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "technologies",
        JSON.stringify(
          formData.technologies
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
        )
      );

      data.append(
        "githubLink",
        formData.githubLink
      );

      data.append(
        "liveLink",
        formData.liveLink
      );

      data.append(
        "status",
        formData.status
      );

      screenshots.forEach(
        (image) => {

          data.append(
            "screenshots",
            image
          );

        }
      );

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${
                token || ""
                }`,
            },

            body: data,
          }
        );

      const responseText =
        await response.text();

      let result;

      try {

        result =
          JSON.parse(
            responseText
          );

      }

      catch {

        console.log(
          "Server response:",
          responseText
        );

        throw new Error(
          "Backend returned invalid response"
        );

      }

      if (
        !response.ok
      ) {

        throw new Error(
          result.message ||
          "Project save failed"
        );

      }

      alert(
        "Project saved successfully ✓"
      );

      /* Reset */

      setFormData({

        title: "",
        category: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveLink: "",
        status: "Completed",

      });

      setScreenshots([]);

    }

    catch (error) {

      console.log(
        error
      );

      alert(

        error instanceof Error
          ? error.message
          : "Something went wrong"

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      className=
      {styles.page}
    >

      <div
        className=
        {styles.card}
      >

        <h1
          className=
          {styles.heading}
        >
          Add Project
        </h1>

        <p
          className=
          {styles.subHeading}
        >
          Create portfolio projects
        </p>

        <form
          className=
          {styles.form}

          onSubmit=
          {handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value=
            {formData.title}
            onChange=
            {handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value=
            {formData.category}
            onChange=
            {handleChange}
          />

          <textarea
            rows={5}
            name="description"
            placeholder="Description"
            value=
            {formData.description}
            onChange=
            {handleChange}
            required
          />

          <input
            type="text"
            name="technologies"
            placeholder="React, Node, MongoDB"
            value=
            {formData.technologies}
            onChange=
            {handleChange}
          />

          <input
            type="url"
            name="githubLink"
            placeholder="Github URL"
            value=
            {formData.githubLink}
            onChange=
            {handleChange}
          />

          <input
            type="url"
            name="liveLink"
            placeholder="Live URL"
            value=
            {formData.liveLink}
            onChange=
            {handleChange}
          />

          <select
            name="status"
            value=
            {formData.status}
            onChange=
            {handleChange}
          >

            <option>
              Completed
            </option>

            <option>
              In Progress
            </option>

            <option>
              Upcoming
            </option>

          </select>

          <div>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange=
              {handleImage}
            />

            <p
              className=
              {styles.fileCount}
            >
              {
                screenshots.length
              }/5 screenshots selected
            </p>

          </div>

          <button
            type="submit"
            disabled=
            {loading}
          >

            {
              loading
                ? "Saving..."
                : "Save Project"
            }

          </button>

        </form>

      </div>

    </div>

  );

}
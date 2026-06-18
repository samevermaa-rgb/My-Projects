"use client";

import { useState } from "react";

import styles from "./Contact.module.css";

import Navbar from "../_Component/Navbar";
import Footer from "../_Component/Footer";

export default function Contact() {

  /* Form State */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* Success Message */
  const [showMessage, setShowMessage] = useState(false);

  /* Error Message */
  const [errorMessage, setErrorMessage] = useState("");

  /* Handle Input Change */
  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* Handle Submit */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      /* Error Handling */
      if (!response.ok) {

        throw new Error(
          data.message || "Failed to send message"
        );
      }

      console.log(data);

      /* Show Success Message */
      setShowMessage(true);

      /* Clear Form */
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      /* Hide Message After 3 Seconds */
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);

    } catch (error) {

      console.log(error);

      setErrorMessage(
        error.message || "Something went wrong"
      );
    }
  };

  return (
    <section className={styles.contact}>

      <Navbar />

      {/* Blur Effects */}
      <div className={styles.blurOne}></div>
      <div className={styles.blurTwo}></div>

      {/* Success Message */}
      {showMessage && (
        <div className={styles.successMessage}>
          Message Sent Successfully ✓
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className={styles.errorMessage}>
          {errorMessage}
        </div>
      )}

      <div className={styles.container}>

        {/* Left Section */}
        <div className={styles.left}>

          <p className={styles.subTitle}>
            Get In Touch
          </p>

          <h1 className={styles.title}>
            Let's Build Something
            <span> Amazing Together</span>
          </h1>

          <p className={styles.description}>
            Feel free to contact me for collaboration,
            freelance work or any web development projects.
            I'm always open to discussing new opportunities.
          </p>

          {/* Contact Info */}
          <div className={styles.contactInfo}>

            <div className={styles.infoCard}>
              <h3>Email</h3>

              <a href="mailto:sameer@example.com">
                sameer@example.com
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3>LinkedIn</h3>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/sameer
              </a>
            </div>

            <div className={styles.infoCard}>
              <h3>GitHub</h3>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/sameer
              </a>
            </div>

          </div>
        </div>

        {/* Right Section */}
        <div className={styles.formCard}>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >

            {/* Name */}
            <div className={styles.inputGroup}>

              <label>Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Email */}
            <div className={styles.inputGroup}>

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Message */}
            <div className={styles.inputGroup}>

              <label>Message</label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

            </div>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
}
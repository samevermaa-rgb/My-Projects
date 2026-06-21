"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";

import Link from "next/link";

import "./register.css";

export default function RegisterPage() {

  /* Form State */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* Success Message */
  const [successMessage, setSuccessMessage] = useState("");

  /* Error Message */
  const [errorMessage, setErrorMessage] = useState("");

  /* Handle Change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* Handle Submit */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    /* Password Match Validation */
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      setErrorMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

      const response = await fetch(
        "https://backend-xy1s.onrender.com/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      /* Error Handling */
      if (!response.ok) {

        throw new Error(
          data.message || "Registration failed"
        );
      }

      console.log(data);

      setSuccessMessage(
        "Account Created Successfully ✓"
      );

      /* Reset Form */
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error: any) {

      console.log(error);

      setErrorMessage(
        error.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="register-page">

      {/* Background Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="register-container">

        {/* Left Section */}
        <div className="register-left">

          <span className="badge">
            Join The Future
          </span>

          <h1>
            Create Your <br />
            Creative Account
          </h1>

          <p>
            Start your journey with a modern
            platform designed for developers,
            creators, and digital innovators.
          </p>

        </div>

        {/* Right Section */}
        <div className="register-right">

          <div className="form-box">

            <h2>Create Account</h2>

            <p className="subtitle">
              Fill in your details to get started
            </p>

            {/* Success Message */}
            {successMessage && (
              <p className="success-message">
                {successMessage}
              </p>
            )}

            {/* Error Message */}
            {errorMessage && (
              <p className="error-message">
                {errorMessage}
              </p>
            )}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/* Full Name */}
              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Email */}
              <div className="input-group">

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Password */}
              <div className="input-group">

                <label>Password</label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Confirm Password */}
              <div className="input-group">

                <label>Confirm Password</label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                type="submit"
                className="register-btn"
              >
                Create Account
              </button>

            </form>

            <p className="login-text">
              Already have an account?{" "}

              <Link href="/login">
                Sign In
              </Link>

            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
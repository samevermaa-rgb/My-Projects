"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./login.css";

interface LoginForm {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<LoginForm>({
      email: "",
      password: "",
    });

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /* Handle Input Change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Handle Form Submit */
  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);
  setErrorMessage("");
  setSuccessMessage("");

  try {
    /* Frontend validation */
    if (
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      throw new Error(
        "Email and password are required"
      );
    }

    const response = await fetch(
      "http://my-projects-2wvq.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(
        "Invalid server response"
      );
    }

    /* Backend error handling */
    if (!response.ok) {
      throw new Error(
        data?.message ||
          "Login failed"
      );
    }

    console.log(
      "Login Success:",
      data
    );

    /* Save user */
    if (data?.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );
    }

    /* Save JWT token */
    if (data?.token) {
      localStorage.setItem(
        "token",
        data.token
      );
    }

    setSuccessMessage(
      "Login Successful ✓"
    );

    setTimeout(() => {
      router.push(
        "/dashboard"
      );
    }, 1500);

  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    setErrorMessage(
      error instanceof Error
        ? error.message
        : "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      {/* Background */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>

      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">
          <span className="badge">
            Welcome Back
          </span>

          <h1>
            Build Beautiful
            <br />
            Digital Experiences
          </h1>

          <p>
            Access your dashboard,
            manage projects, and
            continue your web
            development journey.
          </p>
        </div>

        {/* Right Side */}
        <div className="login-right">

          <div className="form-box">

            <h2>Sign In</h2>

            <p className="subtitle">
              Enter your credentials
              to continue
            </p>

            {successMessage && (
              <p className="success-message">
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className="error-message">
                {errorMessage}
              </p>
            )}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* Email */}
              <div className="input-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* Password */}
              <div className="input-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <div className="form-options">

                <label className="remember">
                  <input
                    type="checkbox"
                  />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="forgot"
                >
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In"}
              </button>

            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="google-btn">

              <Image
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                width={20}
                height={20}
              />

              Continue with Google

            </button>

            <p className="signup-text">
              Don&apos;t have an
              account?{" "}

              <Link href="/register">
                Create Account
              </Link>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
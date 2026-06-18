// app/_Component/Navbar.jsx

"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.highlight}>S</span>ameer
        </Link>

        {/* Navigation */}
        <nav className={styles.navMenu}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>

          <Link href="/about" className={styles.navLink}>
            About
          </Link>

          <Link href="/projects" className={styles.navLink}>
            Projects
          </Link>

          <Link href="/contact" className={styles.contactBtn}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
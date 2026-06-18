// components/dashboard/Navbar.tsx

"use client";

import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.dashboardNavbar}>
      {/* LEFT SIDE */}
      <div className={styles.navbarLeft}>
        <div className={styles.logoBox}>
          <div className={styles.logoCircle}>
            S
          </div>

          <div>
            <h2 className={styles.logoTitle}>
              Sameer Dashboard
            </h2>

            <p className={styles.logoSubtitle}>
              Creative Developer Panel
            </p>
          </div>
        </div>
      </div>

      {/* CENTER MENU */}
      <nav className={styles.navbarCenter}>
        <Link
          href="/dashboard"
          className={`${styles.navItem} ${styles.active}`}
        >
          <span>🏠</span>
          Dashboard
        </Link>

        <Link
          href="/dashboard/projects"
          className={styles.navItem}
        >
          <span>🚀</span>
          Projects


        </Link>

        <Link
          href="/dashboard/messages"
          className={styles.navItem}
        >
          <span>💬</span>
          Messages


        </Link>

        <Link
          href="/dashboard/settings"
          className={styles.navItem}
        >
         
        </Link>
      </nav>

    </header>
  );
}
"use client";

import styles from "@/components/layouts/Footer/Footer.module.scss";
import Link from "next/link";
import Logo from "public/images/logo.svg";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.snsContainer}>
        <div className={styles.sns}>
          <p>Keep In Touch</p>
          <div className={styles.icons}>
            <Link href="https://twitter.com/meimei_kr_" data-testid="x-link">
              <FaXTwitter />
            </Link>
            <Link href="https://github.com/meimei-kr" data-testid="github-link">
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.logo}>
        <div className={styles.circle}>
          <Logo className={styles.logoImg} data-testid="logo" />
        </div>
      </div>
      <div className={styles.items}>
        <ul>
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Use</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className={styles.copyrights}>
        <small>©2024 IDEA SPACE TRIP</small>
      </div>
    </footer>
  );
}

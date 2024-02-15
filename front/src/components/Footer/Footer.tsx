"use client";

import styles from "@/components/Footer/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className={styles.container}>
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
          <Image
            src="/logo.svg"
            alt="IDEA SPACE TRIP Logo"
            width={168}
            height={72}
            priority
          />
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
        <p>©2024 IDEA SPACE TRIP</p>
      </div>
    </div>
  );
}

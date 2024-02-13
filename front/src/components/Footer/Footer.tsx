"use client";

import styles from "@/components/Footer/Footer.module.scss";
import Image from "next/image";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.sns}>
        <p>KEEP IN TOUCH</p>
        <FaXTwitter />
        <FaGithub />
      </div>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="IDEA SPACE TRIP Logo"
          width={168}
          height={72}
          priority
        />
      </div>
      <div className={styles.items}>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={styles.copyrights}>
        <p>©2024 IDEA SPACE TRIP. All Rights Reserved.</p>
      </div>
    </div>
  );
}

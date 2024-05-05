import styles from "@/features/home/components/HeroSection/HeroSection.module.scss";
import Image from "next/image";
import earth from "/public/images/earth.webp";

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <Image
        src={earth}
        alt="earth"
        sizes="100vw, (min-width: 1280px) 45vw"
        priority={true}
        className={styles.earthImg}
        data-testid="earth"
      />
      <div className={styles.slogan}>
        <span>EXPLORE</span> <span>INFINITE</span> <span>CREATIVITY</span>
      </div>
    </section>
  );
}

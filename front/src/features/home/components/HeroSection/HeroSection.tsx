import styles from "@/features/home/components/HeroSection/HeroSection.module.scss";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <Image
        src="/images/earth.webp"
        alt="earth"
        width={502}
        height={497}
        sizes="(min-width: 1280px) 45vw, 100vw"
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

import styles from "@/features/home/components/HeroSection/HeroSection.module.scss";
import Earth from "public/images/earth.svg";

export default function HeroSection() {
  return (
    <section className={styles.heroWrapper}>
      <Earth className={styles.earthImg} data-testid="earth" />
      <div className={styles.slogan}>
        <span>EXPLORE</span> <span>INFINITE</span> <span>CREATIVITY</span>
      </div>
    </section>
  );
}

import styles from "@/app/Home.module.scss";
import * as Home from "@/features/home/components";

export default async function page() {
  return (
    <main className={styles.main}>
      <Home.HeroSection />
      <Home.AboutSection />
      <Home.FeaturesSection />
      <Home.LoginSection />
    </main>
  );
}

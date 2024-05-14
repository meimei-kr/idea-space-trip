import styles from "@/app/Home.module.scss";
import { HeroSection } from "@/features/home/components";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() =>
  import("@/features/home/components").then((mod) => mod.AboutSection),
);
const FeaturesSection = dynamic(() =>
  import("@/features/home/components").then((mod) => mod.FeaturesSection),
);
const LoginSection = dynamic(
  () => import("@/features/home/components").then((mod) => mod.LoginSection),
  { ssr: false },
);

export default async function page() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <LoginSection />
    </main>
  );
}

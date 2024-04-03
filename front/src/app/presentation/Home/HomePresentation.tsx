import styles from "@/app/presentation/Home/HomePresentation.module.scss";
import * as Home from "@/features/home/components";
import type { Session } from "next-auth";

export function HomePresentation({ session }: { session: Session | null }) {
  return (
    <main className={styles.main}>
      <Home.HeroSection />
      <Home.AboutSection />
      <Home.FeaturesSection />
      <Home.LoginSection session={session} />
    </main>
  );
}

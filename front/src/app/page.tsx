import styles from "@/app/Home.module.scss";
import * as Home from "@/features/home/components";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <main className={styles.main}>
      <Home.HeroSection />
      <Home.AboutSection />
      <Home.FeaturesSection />
      <Home.LoginSection session={session} />
    </main>
  );
}

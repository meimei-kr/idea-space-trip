import styles from "@/app/[uuid]/end-session/EndSession.module.scss";
import Description from "@/components/elements/Description/Description";
import Astronaut from "public/images/astronaut.svg";

export default function EndSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Description>アイデア出しセッション終了</Description>
          <div className={styles.astronautContainer}>
            <div className={styles.fukidashi}>\ お疲れさまでした /</div>
            <Astronaut className={styles.astronaut} />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}

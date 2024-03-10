import styles from "@/components/elements/AiGenerationLoading/AiGenerationLoading.module.scss";

export default function AiGenerationLoading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinnerBox}>
        <div className={styles.solarSystem}>
          <div className={`${styles.earthOrbit} ${styles.orbit}`}>
            <div className={styles.planet}></div>
            <div className={`${styles.venusOrbit} ${styles.orbit}`}>
              <div className={styles.planet}></div>
              <div className={`${styles.mercuryOrbit} ${styles.orbit}`}>
                <div className={styles.planet}></div>
                <div className={styles.sun}></div>
              </div>
            </div>
          </div>
        </div>
        <p>テーマ案生成中...</p>
      </div>
    </div>
  );
}

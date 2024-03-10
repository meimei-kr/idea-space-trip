import styles from "@/components/elements/Loading/Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinnerBox}>
        <div className={`${styles.blueOrbit} ${styles.leo}`}></div>
        <div className={`${styles.greenOrbit} ${styles.leo}`}></div>
        <div className={`${styles.redOrbit} ${styles.leo}`}></div>
        <div
          className={`${styles.whiteOrbit} ${styles.w1} ${styles.leo}`}
        ></div>
        <div
          className={`${styles.whiteOrbit} ${styles.w2} ${styles.leo}`}
        ></div>
        <div
          className={`${styles.whiteOrbit} ${styles.w3} ${styles.leo}`}
        ></div>
      </div>
      <p>LOADING...</p>
    </div>
  );
}

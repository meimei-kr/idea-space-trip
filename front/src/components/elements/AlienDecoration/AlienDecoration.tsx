import styles from "@/components/elements/AlienDecoration/AlienDecoration.module.scss";
import Alien from "public/images/alien.svg";

export default function AlienDecoration({ number }: { number: number }) {
  const addZero = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  return (
    <div className={styles.decoration}>
      <Alien className={styles.svg} />
      <span className={styles.number}>{addZero(number)}</span>
    </div>
  );
}

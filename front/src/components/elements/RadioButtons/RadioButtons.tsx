import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/RadioButtons/RadioButtons.module.scss";

export default function RadioButtons({
  options,
  ariaDescribedby,
}: {
  options: string[];
  ariaDescribedby: string;
}) {
  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <div className={styles.radioButton} key={(index + 1) * 10}>
          <label
            htmlFor={`option${(index + 1) * 10}`}
            aria-labelledby={`option${(index + 1) * 10}`}
            className={styles.label}
          >
            <AlienDecoration number={index + 1} />
            <input
              type="radio"
              id={`option${(index + 1) * 10}`}
              name="option"
              value={option}
              aria-describedby={ariaDescribedby}
              className={styles.input}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

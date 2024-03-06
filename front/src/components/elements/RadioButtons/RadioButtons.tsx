import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/RadioButtons/RadioButtons.module.scss";

export default function RadioButtonForm({
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
          <AlienDecoration number={(index + 1) * 10} />
          <input
            type="radio"
            id={`option${(index + 1) * 10}`}
            name="option"
            value={option}
            aria-describedby={ariaDescribedby}
            className={styles.input}
          />
          <label htmlFor={`option${(index + 1) * 10}`}>{option}</label>
        </div>
      ))}
    </div>
  );
}

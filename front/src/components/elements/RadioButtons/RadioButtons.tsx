import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/RadioButtons/RadioButtons.module.scss";
import { RadioButtonsProps } from "@/types";
import { useState } from "react";

export default function RadioButtons({
  options,
  ariaDescribedby,
}: RadioButtonsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <label
          htmlFor={`option${index + 1}`}
          aria-labelledby={`option${index + 1}`}
          className={`${styles.label} ${selectedOption === option.value ? styles.selected : ""}`}
          key={index + 1}
        >
          <AlienDecoration number={index + 1} />
          <input
            type="radio"
            id={`option${index + 1}`}
            name="option"
            value={option.value}
            aria-describedby={ariaDescribedby}
            className={styles.input}
            onChange={handleOptionChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

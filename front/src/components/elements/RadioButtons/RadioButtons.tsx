import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/RadioButtons/RadioButtons.module.scss";
import { ThemeCategoryEnum } from "@/utils/enums";
import { useState } from "react";

export default function RadioButtons({
  options,
  ariaDescribedby,
}: {
  options: string[];
  ariaDescribedby: string;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <label
          htmlFor={`option${(index + 1) * 10}`}
          aria-labelledby={`option${(index + 1) * 10}`}
          className={`${styles.label} ${selectedOption === option ? styles.selected : ""}`}
          key={(index + 1) * 10}
        >
          <AlienDecoration number={index + 1} />
          <input
            type="radio"
            id={`option${(index + 1) * 10}`}
            name="option"
            value={option}
            aria-describedby={ariaDescribedby}
            className={styles.input}
            onChange={handleOptionChange}
          />
          {ThemeCategoryEnum[option as keyof typeof ThemeCategoryEnum]}
        </label>
      ))}
    </div>
  );
}

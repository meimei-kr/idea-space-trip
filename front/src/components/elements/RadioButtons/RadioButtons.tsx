"use client";

import AlienDecoration from "@/components/elements/AlienDecoration/AlienDecoration";
import styles from "@/components/elements/RadioButtons/RadioButtons.module.scss";
import { LitUpBorders } from "@/components/ui/tailwind-buttons";
import { MIN_DISPLAY_OPTION } from "@/constants/constants";
import { RadioButtonsProps } from "@/types";
import { useState } from "react";

export default function RadioButtons({
  options,
  ariaDescribedby,
}: RadioButtonsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isClickedLoadMore, setIsClickedLoadMore] = useState<boolean>(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleClick = () => {
    setIsClickedLoadMore(true);
  };

  return (
    <div className={styles.container}>
      {options.map(
        (option, index) =>
          (index <= MIN_DISPLAY_OPTION || isClickedLoadMore) && (
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
          ),
      )}
      {!isClickedLoadMore && (
        <div className={styles.loadMoreButton}>
          <LitUpBorders type="button" onClick={handleClick}>
            もっと見る
          </LitUpBorders>
        </div>
      )}
    </div>
  );
}

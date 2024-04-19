"use client";

import styles from "@/components/elements/Textbox/Textbox.module.scss";
import { Textarea } from "@/components/ui/textarea";
import { FORM_CHARACTER_LIMIT } from "@/constants/constants";
import type { TextboxProps } from "@/types";
import { useState } from "react";
// import { FaMicrophone } from "react-icons/fa6";

export default function Textbox({
  id,
  name,
  ariaDescribedby,
  placeholder,
  defaultValue,
}: TextboxProps) {
  const [characterCount, setCharacterCount] = useState(
    defaultValue?.length || 0,
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <div className={styles.textareaWrapper}>
      <div className={styles.textareaContainer}>
        <Textarea
          id={id}
          name={name}
          aria-describedby={ariaDescribedby}
          placeholder={placeholder}
          className={styles.textarea}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
        {/* <FaMicrophone className={styles.microphone} /> */}
      </div>
      <div className={styles.characterCount}>
        あと{" "}
        <span
          className={`${FORM_CHARACTER_LIMIT - characterCount < 0 ? styles.overLimit : ""}`}
        >
          {FORM_CHARACTER_LIMIT - characterCount}
        </span>{" "}
        文字
      </div>
    </div>
  );
}

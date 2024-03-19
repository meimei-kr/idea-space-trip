import styles from "@/components/elements/Textbox/Textbox.module.scss";
import { Textarea } from "@/components/ui/textarea";
import type { TextboxProps } from "@/types";
import { FaMicrophone } from "react-icons/fa6";

export default function Textbox({
  id,
  name,
  ariaDescribedby,
  placeholder,
  defaultValue,
}: TextboxProps) {
  return (
    <div className={styles.textareaContainer}>
      <Textarea
        id={id}
        name={name}
        aria-describedby={ariaDescribedby}
        placeholder={placeholder}
        className={styles.textarea}
        defaultValue={defaultValue}
      />
      <FaMicrophone className={styles.microphone} />
    </div>
  );
}

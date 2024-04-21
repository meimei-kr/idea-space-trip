"use client";

import styles from "@/components/elements/Textbox/Textbox.module.scss";
import { Textarea } from "@/components/ui/textarea";
import { FORM_CHARACTER_LIMIT } from "@/constants/constants";
import type { TextboxProps } from "@/types";
import { useEffect, useState } from "react";
import { FaCircleStop, FaMicrophone } from "react-icons/fa6";

export default function Textbox({
  id,
  name,
  ariaDescribedby,
  placeholder,
  defaultValue,
  isResetTextbox,
  setIsResetTextbox,
}: TextboxProps) {
  const [isRecording, setIsRecording] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recordedText, setRecordedText] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transcript, setTranscript] = useState<string>("");
  const [inputText, setInputText] = useState<string>(defaultValue || "");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null,
  );
  const [characterCount, setCharacterCount] = useState(inputText.length || 0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.continuous = true;
    recognition.interimResults = true;
    setRecognition(recognition);
  }, []);

  useEffect(() => {
    if (!recognition) return;
    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (e) => {
      const results = e.results;
      for (let i = e.resultIndex; i < results.length; i++) {
        const result = results[i];
        if (result && result[0]) {
          const reliableResult = result[0];
          if (result.isFinal) {
            setRecordedText((prevText) => {
              const newRecordedText = prevText + reliableResult?.transcript;
              setInputText((prev) => prev + newRecordedText);
              return newRecordedText;
            });
            setTranscript("");
            setRecordedText("");
          } else {
            setTranscript(reliableResult?.transcript);
          }
        }
      }
    };
  }, [recognition]);

  useEffect(() => {
    setCharacterCount(inputText.length);
  }, [inputText]);

  useEffect(() => {
    if (isResetTextbox && setIsResetTextbox) {
      setInputText("");
      setIsResetTextbox(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResetTextbox]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    setIsRecording((prev) => !prev);
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
          value={inputText}
          onChange={handleChange}
        />
        {isRecording ? (
          <FaCircleStop className={styles.icon} onClick={handleClick} />
        ) : (
          <FaMicrophone className={styles.icon} onClick={handleClick} />
        )}
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

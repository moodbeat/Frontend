import { FieldHookConfig, useField } from "formik";
import styles from "./Textarea.module.scss";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";
import { useState } from "react";

interface OtherProps {
  label: string;
  placeholder: string;
}

export const Textarea = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharCount(value.length);
    field.onChange(e);
  };

  return (
    <div style={{ position: "relative" }}>
      <textarea
        onInput={handleInputChange}
        placeholder={props.placeholder}
        className={
          meta.touched && meta.error
            ? `${styles.textarea} ${styles.textareaError}`
            : styles.textarea
        }
        {...field}
      />
      <span
        className={`${styles.charCount} ${
          meta.error ? styles.charCountErrored : ""
        }`}
      >
        {charCount}/{500}
      </span>

      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};

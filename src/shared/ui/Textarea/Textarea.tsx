import { FieldHookConfig, useField } from "formik";
import styles from "./Textarea.module.scss";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";

interface OtherProps {
  label: string;
  placeholder: string;
}

export const Textarea = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  const preventInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      e.preventDefault();
      e.target.value = e.target.value.substring(0, 500);
    }
  };

  return (
    <>
      <textarea
        onInput={preventInput}
        placeholder={props.placeholder}
        className={
          meta.touched && meta.error
            ? `${styles.textarea} ${styles.textareaError}`
            : styles.textarea
        }
        {...field}
      />

      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  );
};

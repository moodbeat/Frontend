import { FieldHookConfig, useField } from "formik";
import styles from "./Textarea.module.scss";
import { ErrorMessage } from "@/shared/ui/ErrorMessage/ErrorMessage";

interface OtherProps {
  label: string;
  placeholder: string;
}

export const Textarea = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <>
      <textarea
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

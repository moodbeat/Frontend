import "@/shared/styles/styles.css";
import styles from "./FeedbackForm.module.scss";
import { FormikErrors, useFormik } from "formik";
import { sendFeedback } from "@/shared/api/Api";

interface FormValues {
  name: string;
  comment: string;
  email: string;
}

interface FeedbackFormProps {
  setIsSubmitted: (value: boolean) => void;
}

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};
  if (!values.name) {
    errors.name = "Укажите Ваше имя";
  }
  if (values.name.length < 2 || values.name.length > 32) {
    errors.name = "Введите имя от 2 до 32 символов";
  }

  if (!values.email) {
    errors.email = "Укажите адрес электронной почты";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Укажите корректный адрес электронной почты";
  } else if (values.email.length > 254) {
    errors.email = "Введите адрес электронной почты до 254 символов";
  }

  if (values.comment.length > 500) {
    errors.comment = "Введите комментарий до 500 символов";
  }

  return errors;
};

export const FeedbackForm = ({ setIsSubmitted }: FeedbackFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      sendFeedback(values);
      resetForm();
      setIsSubmitted(true);
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>Остались еще вопросы? Напишите нам!</h2>
      <div className={styles.div}>
        <input
          className={styles.input}
          id="name"
          placeholder="Имя"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.error}>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className={styles.div}>
        <input
          className={styles.input}
          id="email"
          placeholder="E-mail"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className={styles.error}>{formik.errors.email}</div>
        ) : null}
      </div>
      <textarea
        className={styles.textarea}
        id="comment"
        placeholder="Комментарий"
        name="comment"
        onChange={formik.handleChange}
        value={formik.values.comment}
        onBlur={formik.handleBlur}
      />
      {formik.touched.comment && formik.errors.comment ? (
        <div className={styles.error}>{formik.errors.comment}</div>
      ) : null}
      <button className={styles.button} type="submit">
        Отправить
      </button>
      <p className={styles.p}>
        Нажимая на кнопку, я соглашаюсь на{" "}
        <a className={styles.a}>обработку персональных данных.</a>
      </p>
    </form>
  );
};

import "@/shared/styles/styles.css";
import styles from "./FeedbackForm.module.scss";
import { Form, Formik } from "formik";
import { sendFeedback } from "@/shared/api/Api";
import { Input } from "@/shared/ui/Input/Input";
import { feedbackSchema } from "@/schemas/validationSchema";
import { Button } from "@/shared/ui/Button/Button";
import { Textarea } from "@/shared/ui/Textarea/Textarea";

interface FeedbackFormProps {
  setIsSubmitted: (value: boolean) => void;
}

export const FeedbackForm = ({ setIsSubmitted }: FeedbackFormProps) => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        comment: "",
      }}
      onSubmit={(values, { resetForm }) => {
        sendFeedback(values);
        resetForm();
        setIsSubmitted(true);
      }}
      validationSchema={feedbackSchema}
    >
      {({ isValid, dirty }) => (
        <Form noValidate className={styles.form}>
          <h2 className={styles.title}>Остались еще вопросы? Напишите нам!</h2>
          <div className={styles.div}>
            <Input
              label=""
              placeholder="Имя"
              name="name"
              type="text"
              customStyle={true}
            />
          </div>
          <div className={styles.div}>
            <Input
              label=""
              placeholder="E-mail"
              name="email"
              type="text"
              customStyle={true}
            />
          </div>
          <Textarea label="" placeholder="Оставьте ваш вопрос" name="comment" />
          <Button
            type="submit"
            title="Отправить"
            mode="primary"
            width="220px"
            disabled={!(isValid && dirty)}
          />

          <p className={styles.p}>
            Нажимая на кнопку, я соглашаюсь на{" "}
            <a className={styles.a}>обработку персональных данных.</a>
          </p>
        </Form>
      )}
    </Formik>
  );
};

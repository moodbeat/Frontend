import "@/shared/styles/styles.css";
import styles from "./FeedbackForm.module.scss";
import { Form, Formik } from "formik";
import { sendFeedback } from "@/shared/api/Api";
import { Input } from "@/shared/ui/Input/Input";
import { feedbackSchema } from "@/schemas/validationSchema";
import { Button } from "@/shared/ui/Button/Button";
import { Textarea } from "@/shared/ui/Textarea/Textarea";
import { useEffect, useState } from "react";

interface FeedbackFormProps {
  setIsSubmitted: (value: boolean) => void;
}

export const FeedbackForm = ({ setIsSubmitted }: FeedbackFormProps) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Функция, которая будет обновлять значение ширины экрана при изменении размера окна браузера
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Добавить слушатель событий для изменения размера окна браузера
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  // Функция, которая вычислит значение ширины кнопки, исходя из ширины экрана
  const getButtonWidth = () => {
    if (screenWidth >= 768) {
      return "220px";
    } else {
      return "280px";
    }
  };
  const getAlignSelf = () => {
    if (screenWidth >= 768) {
      return "";
    } else {
      return "center";
    }
  };

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
          <h2 className={styles.title}>
            Остались еще&nbsp;вопросы? Напишите нам!
          </h2>
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
          <div className={styles.buttonBox}>
            <div style={{ alignSelf: getAlignSelf() }}>
              <Button
                type="submit"
                title="Отправить"
                mode="primary"
                width={getButtonWidth()}
                disabled={!(isValid && dirty)}
              />
            </div>

            <p className={styles.p}>
              Нажимая на кнопку, я соглашаюсь на&nbsp;
              <a className={styles.a}>обработку персональных данных.</a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])[A-Za-zА-Яа-яЁё\d@$!%*#?&]+$/;
const emailRules = /^([A-Za-z0-9\-_@.]+)$/;
const nameRules = /^[а-яА-ЯЁё]+(-[а-яА-ЯЁё]+)?$/;
const commentRules = /^[\na-zA-Zа-яА-Я0-9 ,.!?;:-]*$/;
const commentMessage = "Некорректный комментарий";
const errorMessage = "Пожалуйста, проверьте, правильно ли указан адрес";
const emailMessage = "Некорректный e-mail";
const emailMessageFeedbackForm =
  "Пожалуйста, проверьте, правильно ли указан адрес";
const passwordErrorMessage = "Пароль не соответствует требованиям";
const nameErrorMessage = "Некорректное имя или есть лишние пробелы";
const lastNameErrorMessage = "Некорректная фамилия или есть лишние пробелы";
const requiredMessage = "Обязательное поле";
const minLengthPassword = "Минимальное количество символов: 8";
const maxLengthPassword = "Максимальное количество символов: 254";
const minLengthName = "Минимальное количество символов: 2";
const maxLengthName = "Максимальное количество символов: 32";
const maxLengthComment = "Максимальное количество символов: 500";

export const advancedSchema = yup.object().shape({
  password: yup
    .string()
    .required(requiredMessage)
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(passwordRules, {
      message: passwordErrorMessage,
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required(requiredMessage),
  firstName: yup
    .string()
    .min(2, minLengthName)
    .max(32, maxLengthName)
    .matches(nameRules, {
      message: nameErrorMessage,
    })
    .required(requiredMessage),
  lastName: yup
    .string()
    .min(2, minLengthName)
    .max(32, maxLengthName)
    .matches(nameRules, {
      message: lastNameErrorMessage,
    })
    .required(requiredMessage),
  department: yup.string().required(requiredMessage),
  position: yup.string().required(requiredMessage),
});

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(emailRules, {
      message: errorMessage,
    })
    .email(errorMessage)
    .required(errorMessage),
  password: yup.string().required(requiredMessage),
});

export const refreshEmailSchema = yup.object().shape({
  email: yup
    .string()
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(emailRules, {
      message: errorMessage,
    })
    .email(errorMessage)
    .required(errorMessage),
});

export const addEmailSchema = yup.object().shape({
  email: yup
    .string()
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(emailRules, {
      message: emailMessage,
    })
    .email(emailMessage)
    .required(emailMessage),
});

export const refreshPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required(requiredMessage)
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(passwordRules, {
      message: passwordErrorMessage,
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required(requiredMessage),
});

export const feedbackSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, minLengthName)
    .max(32, maxLengthName)
    .matches(nameRules, {
      message: nameErrorMessage,
    })
    .required(requiredMessage),
  email: yup
    .string()
    .min(8, minLengthPassword)
    .max(254, maxLengthPassword)
    .matches(emailRules, {
      message: emailMessageFeedbackForm,
    })
    .email(emailMessageFeedbackForm)
    .required(requiredMessage),
  comment: yup.string().max(500, maxLengthComment).matches(commentRules, {
    message: commentMessage,
  }),
});

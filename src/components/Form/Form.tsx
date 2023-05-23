import React from "react";
import classes from "./form.module.css";
import { FormInput } from "@/shared/ui/FormInput/FormInput";
import { Button } from "@/shared/ui/Button/Button";

interface FormProps {
  title: string;
  subtitle?: string;
}

export const Form: React.FC<FormProps> = ({ title }) => {
  return (
    <form className={classes.form}>
      <h2 className={classes.formTitle}>{title}</h2>
      <FormInput labelText="Введите e-mail" type="email" />
      <FormInput labelText="Введите пароль" type="password" />
      <Button title="Войти" mode="outline" />
      <p className={classes.formBottomText}>Забыли пароль?</p>
    </form>
  );
};

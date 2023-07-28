import styles from "./inputbutton.module.scss";
import React from "react";

interface InputButtonProps {
  handleOpenPassword: () => void;
  passwordOpened: boolean;
}

export const InputButton: React.FC<InputButtonProps> = ({
  handleOpenPassword,
  passwordOpened,
}) => {
  return (
    <button
      onClick={handleOpenPassword}
      type="button"
      className={
        !passwordOpened
          ? `${styles.button} ${styles.buttonOpened}`
          : `${styles.button} ${styles.buttonClosed}`
      }
    />
  );
};

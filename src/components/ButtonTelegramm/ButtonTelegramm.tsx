import styles from "./buttonTelegramm.module.css";
import { Link } from "react-router-dom";
import iconTelegramm from "./icon-telegramm.svg";

export const ButtonTelegramm = () => {
  return (
    <Link to='http://t.me/moodbeatbot' className={styles.buttonTelegramm} target="_blank">
      <img src={iconTelegramm} className={styles.buttonTelegramm__icon}/>
    </Link>
  )
}


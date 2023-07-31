import styles from "./wheelBanner.module.scss";
import Wheel from "@/assets/wheel_banner.png";
import {useNavigate} from "react-router-dom";


export const WheelBanner = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wheelbanner}>
      <div className={styles.container}>
        <img src={Wheel} alt="Wheel" className={styles.wheel}/>
        <div className={styles.title}>
          <h3 className={styles.name}>Составьте колесо жизненного баланса</h3>
          <p className={styles.text}>Это поможет правильно направить внимание на важные сферы жизни</p>
        </div>
      </div>
      <button onClick={() => navigate("/balance-wheel")} type="button" className={styles.button}>
        Составить колесо
      </button>
    </div>
  );
};

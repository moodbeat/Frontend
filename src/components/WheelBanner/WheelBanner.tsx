import styles from "./wheelBanner.module.scss";
import Wheel from "./assets/BalanceWheel-img.png";
import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/ui/Button/Button.tsx";


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
      <Button mode="outline" title="Составить колесо" handleClick={() => navigate("/balance-wheel")}/>
    </div>
  );
};

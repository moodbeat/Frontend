import styles from './CustomHeader.module.scss';
import {ReactElement} from "react";

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}
export const CustomHeader = ({ date, decreaseMonth, increaseMonth }: CustomHeaderProps): ReactElement => {

 return (
    <div className={styles.customHeader}>
      <div className={styles.prevMonth} onClick={decreaseMonth}></div>
      <div className={styles.currentMonthYear}>
        {date.toLocaleString('ru', {
          month: 'long',
          year: 'numeric',
        })}
      </div>
      <div className={styles.nextMonth} onClick={increaseMonth}></div>
    </div>
  );
}

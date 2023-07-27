import { ReactElement, useRef, useState } from "react";
import styles from "./PeriodPicker.module.scss";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

interface Props {
  handleChooseOption: (value: string) => void;
  value: string;
}

export const PeriodPicker = ({handleChooseOption, value}: Props): ReactElement => {
  const [optionsOpened, setOptionsOpened] = useState(false);
  const ref = useRef<null>(null);
  const dateOptions = ['Сегодня', 'Текущая неделя', 'Текущий месяц', 'За все время'];

  useOutsideClick(() => setOptionsOpened(false), ref);

  const setOptionAndClose = (option: string) => {
    handleChooseOption(option);
    setOptionsOpened(false);
  }

  return (
    <div
      className={styles.periodPicker}
      ref={ref}
    >
      <div
        className={optionsOpened ? `${styles.select} ${styles.selectOptionsOpened}` : styles.select}
      >
        <p>{value || 'Текущий месяц'}</p>
        <button onClick={() => setOptionsOpened(!optionsOpened)} className={optionsOpened ? `${styles.selectButton} ${styles.selectButtonOpened}` : styles.selectButton} />
      </div>
      {
        optionsOpened &&
        <ul className={styles.optionsList}>
          {dateOptions.map((option, index) => (
            <li
              onClick={() => setOptionAndClose(option)}
              className={styles.optionsListItem}
              key={index}
            >
              {option}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

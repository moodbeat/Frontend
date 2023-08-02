import { ReactElement, useRef, useState } from "react";
import styles from "./PeriodPicker.module.scss";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick.tsx";
import {DateRangePicker} from "@/shared/ui/CustomDatePicker/DateRangePicker.tsx";
import {formatDateToDdMmYy, formatDateToYyyyMmDd} from "@/shared/helpers.ts";

interface Props {
  handleChooseOption: (value: string) => void;
  value: string;
  getPieChartActivities: (id: string | number,
                          days: number,
                          after_date: string,
                          before_date: string) => void;
}

export const PeriodPicker = ({handleChooseOption, value, getPieChartActivities}: Props): ReactElement => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); // для данных в календаре
  const [dateRangeValue, setDateRangeValue] = useState<string>(''); // для данных в селекте
  const [startDate, endDate] = dateRange; // для данных в календаре
  const [optionsOpened, setOptionsOpened] = useState(false);
  const ref = useRef<null>(null);
  const dateOptions = ['Сегодня', 'За неделю', 'За месяц', 'За все время'];
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  useOutsideClick(() => setOptionsOpened(false), ref);

  const setOptionAndClose = (option: string) => {
    handleChooseOption(option);
    setOptionsOpened(false);
    setDateRange([null, null]);
  }

  const resetAndCloseCalendar = () => {
    setIsCalendarOpen(false);
    setOptionsOpened(false);
    setDateRange([null, null]);
  }

  const saveAndCloseCalendar = () => {
    handleChooseOption('');
    setIsCalendarOpen(false);
    setOptionsOpened(false);
    if(startDate && endDate) {
      setDateRangeValue(`${formatDateToDdMmYy(startDate, false)} - ${formatDateToDdMmYy(endDate, false)}`);
      getPieChartActivities(2, 0, formatDateToYyyyMmDd(startDate), formatDateToYyyyMmDd(endDate))
    }
  }

  const handleSetRange = (range: [Date | null, Date | null]) => {
    setDateRange(range);
  }

  return (
    <div
      className={styles.periodPicker}
      ref={ref}
    >
      <div
        className={optionsOpened ? `${styles.select} ${styles.selectOptionsOpened}` : styles.select}
      >
        <p>{value || (dateRangeValue && dateRangeValue) || 'Только что'}</p>
        <button onClick={() => setOptionsOpened(!optionsOpened)} className={optionsOpened ? `${styles.selectButton} ${styles.selectButtonOpened}` : styles.selectButton} />
      </div>
      {
        optionsOpened &&
        <>
          <ul className={styles.optionsList}>
            {dateOptions.map((option) => (
              <li
                onClick={() => setOptionAndClose(option)}
                className={styles.optionsListItem}
                key={Date.now() * Math.random()}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsCalendarOpen(true)} className={styles.periodButton}>Указать период</button>
          <DateRangePicker resetAndCloseCalendar={resetAndCloseCalendar} saveAndCloseCalendar={saveAndCloseCalendar} isMaxDateToday={true} isOpen={isCalendarOpen} startDate={startDate} endDate={endDate} handleSetRange={handleSetRange}/>
        </>
      }
    </div>
  );
};

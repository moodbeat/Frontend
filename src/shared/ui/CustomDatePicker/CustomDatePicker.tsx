import {ReactElement, useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import { isSameDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import ru from 'date-fns/locale/ru';
import { registerLocale } from 'react-datepicker';
import {CustomInput} from "@/shared/ui/CustomDatePicker/components/CustomInput/CustomInput.tsx";
import {CustomHeader} from "@/shared/ui/CustomDatePicker/components/CustomHeader/CustomHeader.tsx";

registerLocale('ru', ru);

interface Props {
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  isMaxDateToday: boolean;
}

export const CustomDatePicker = ({ selectedDate, handleDateChange, isMaxDateToday }: Props): ReactElement => {
  const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log(isCalendarOpen);
  }, [])

  const dayClassName = (date: Date) => {
    if (selectedDate && isSameDay(selectedDate, date)) {
      return 'selected-date';
    }
    return '';
  };

  const currentDate = new Date();

  return (
    <DatePicker
      placeholderText="__.__.____"
      dateFormat="dd.MM.yyyy"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      todayButton={null}
      locale="ru"
      selected={selectedDate}
      onChange={handleDateChange}
      onFocus={() => setCalendarOpen(true)}
      onBlur={() => setCalendarOpen(false)}
      customInput={<CustomInput selectedDate={selectedDate} onClick={() => setCalendarOpen(true)} />}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <CustomHeader
          date={date}
          decreaseMonth={decreaseMonth}
          increaseMonth={increaseMonth}
        />
      )}
      dayClassName={dayClassName}
      calendarClassName="custom-datepicker"
      maxDate={isMaxDateToday ? currentDate : null}
      minDate={!isMaxDateToday ? currentDate : null}
    />
  );
};


import {ReactElement} from 'react';
import DatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import ru from 'date-fns/locale/ru';
import {CustomHeader} from "@/shared/ui/CustomDatePicker/components/CustomHeader/CustomHeader.tsx";
import {Button} from "@/shared/ui/Button/Button.tsx";


registerLocale('ru', ru);

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  startDate: Date | null;
  endDate: Date | null;
  handleSetRange: (date: [Date | null, Date | null]) => void;
  resetAndCloseCalendar?: () => void;
  saveAndCloseCalendar?: () => void;
  isOpen?: boolean;
  isMaxDateToday: boolean;
}

export const DateRangePicker = ({ startDate, endDate, handleSetRange, isMaxDateToday, resetAndCloseCalendar, saveAndCloseCalendar, isOpen }: Props): ReactElement => {

  const currentDate = new Date();


    return (
      <>
        <DatePicker
          onClickOutside={resetAndCloseCalendar}
          selected={startDate}
          todayButton={null}
          locale="ru"
          onChange={(date) => {
            if (date) {
              handleSetRange && handleSetRange(date);
            }
          }}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <CustomHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
            />
          )}
          customInput={<input style={{'display': 'none'}}/>}
          calendarClassName="custom-datepicker-range"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          inline={isOpen && true}
          maxDate={isMaxDateToday ? currentDate : null}
          popperPlacement="bottom"
        >
          <Button width="100%" handleClick={saveAndCloseCalendar} mode="empty" title="Готово" />
        </DatePicker>
      </>
    );
};

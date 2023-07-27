import { DateObject } from "@/types.ts";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Функция для получения дат, чтобы просматривать график за разное время
export const getCurrentDateAndFutureDate = (value: string): DateObject[] => {
  const currentDate = new Date();
  let days = 0;

  switch (value) {
    case "Сегодня":
      days = 0;
      break;
    case "Текущая неделя":
      days = currentDate.getDay() - 1;
      break;
    case "Текущий месяц":
      days = currentDate.getDate() - 1;
      break;
    case "За все время":
      days = 1000;
      break;
  }

  const beforeDate = new Date();
  beforeDate.setDate(currentDate.getDate() - days);

  return [
    { before_date: formatDate(beforeDate), after_date: formatDate(currentDate) }
  ];
};


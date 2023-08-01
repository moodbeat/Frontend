export function formatDateToDdMmYy(date: Date, fullYear: boolean) {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  let year: string = date.getFullYear().toString().slice(2);

  if(fullYear) {
    year = date.getFullYear().toString();
  }

  const formattedDay: string | number = day < 10 ? `0${day}` : day;
  const formattedMonth: string | number = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}

export function formatDateToYyyyMmDd(date: Date) {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: string | number = date.getFullYear();

  const formattedDay: string | number = day < 10 ? `0${day}` : day;
  const formattedMonth: string | number = month < 10 ? `0${month}` : month;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function isTenHoursPassed(dateString: string): boolean {
  const originalDate = new Date(dateString);
  const tenHoursLater = new Date(originalDate.getTime() + 10 * 60 * 60 * 1000);
  const currentDate = new Date();
  return currentDate >= tenHoursLater;
}

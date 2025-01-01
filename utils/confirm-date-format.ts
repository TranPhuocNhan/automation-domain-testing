export function conformDateFormat(date: string): string {
  const [month, day, year] = date.split("/");
  if (!month || !day || !year) throw new Error(`Invalid date format: ${date}`);
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00`;
}

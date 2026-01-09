export function isInMonth(date: string, month: number, year: number) {
  const d = new Date(`${date}T00:00:00`);
  return d.getMonth() + 1 === month && d.getFullYear() === year;
}

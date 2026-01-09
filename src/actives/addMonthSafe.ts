export function addMonthsSafe(date: Date, months: number) {
  const d = new Date(date);
  const day = d.getDate();

  d.setMonth(d.getMonth() + months);

  if (d.getDate() !== day) {
    d.setDate(0); // último dia do mês anterior
  }

  return d;
}

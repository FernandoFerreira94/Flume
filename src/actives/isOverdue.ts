export function isOverdue(dueDateString: string) {
  if (!dueDateString) return false;

  const dueDate = new Date(`${dueDateString}T00:00:00`);
  const today = new Date();

  // zera hora para comparar apenas a data
  today.setHours(0, 0, 0, 0);

  return dueDate < today;
}

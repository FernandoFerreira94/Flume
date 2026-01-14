export function formatDate(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString("pt-BR");
}

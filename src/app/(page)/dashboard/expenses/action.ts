export function verifyInstallmentCount(count: string) {
  const number = Number(count);
  if (number > 0) {
    return number;
  }
  return 1;
}

// Recebe qualquer coisa digitada e devolve centavos (number)
export function parseBRLToCents(value: string): number {
  const onlyDigits = value.replace(/\D/g, "");
  return onlyDigits === "" ? 0 : Number(onlyDigits);
}

// Recebe centavos e devolve string formatada em BRL
export function formatCentsToBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

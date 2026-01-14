type Installment = {
  value: number;
  paid: boolean;
};

export function sumUnpaidInstallments(installments: Installment[]): number {
  return installments
    .filter((i) => i.paid === false)
    .reduce((total, i) => total + i.value, 0);
}

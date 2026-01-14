import { CategoryProps, InstallmentProps } from "@/lib/types";

export function buildCategoryPercentageData(
  categories: CategoryProps[],
  installments: InstallmentProps[]
) {
  // total global (todas as parcelas)
  const totalValue = installments.reduce((sum, item) => sum + item.value, 0);

  if (totalValue === 0) return [];

  return categories
    .map((category) => {
      const categoryTotal = installments
        .filter((item) => item.expense.category_id === category.id)
        .reduce((sum, item) => sum + item.value, 0);

      const percentage = (categoryTotal / totalValue) * 100;
      return {
        id: category.id,
        categoryId: category.id,
        name: category.name,
        color: category.color,
        total: categoryTotal, // em centavos
        percentage, // número (ex: 35.42)
      };
    })
    .filter((item) => item.total > 0);
}

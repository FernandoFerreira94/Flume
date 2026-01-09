export const queryKey = {
  user: (userId: string) => ["user", userId],
  categories: (userId: string) => ["categories", userId],
  expense: (userId: string) => ["expense", userId],
  installments: (userId: string) => ["installments", userId],
};

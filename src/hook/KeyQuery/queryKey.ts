export const queryKey = {
  user: (userId: string) => ["user", userId],
  categories: (userId: string) => ["categories", userId],
};

import { z } from "zod";

export const SchemaCategories = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  name: z.string(),
  user_id: z.string(),
  color: z.string().default("#cccccc"),
});

export type CategoriesSchemaProps = z.infer<typeof SchemaCategories>;

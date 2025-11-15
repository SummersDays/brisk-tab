import z from "zod";

export const exportDataSchema = z.object({
  bookmarks: z.array(
    // TODO: Reuse Bookmark Schema
    z.object({
      name: z.string(),
      url: z.string(),
      favicon: z.string().optional(),
      groupId: z.string()
    })
  )
});

export type ExportData = z.infer<typeof exportDataSchema>;

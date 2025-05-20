import { z } from "zod";

const textPartSchema = z.object({
  text: z.string().min(1).max(2000),
  type: z.enum(["text"]),
});

// Define the tool types that can be selected
export const toolSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("searchExa"),
    category: z.enum([
      "company",
      "research paper",
      "news",
      "pdf",
      "github",
      "tweet",
      "personal site",
      "linkedin profile",
      "financial report",
    ]),
  }),
  z.object({
    type: z.literal("scrapeUrl"),
  }),
]);

export type ToolType = z.infer<typeof toolSchema>;

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    role: z.enum(["user"]),
    content: z.string().min(1).max(2000),
    parts: z.array(textPartSchema),
    experimental_attachments: z
      .array(
        z.object({
          url: z.string().url(),
          name: z.string().min(1).max(2000),
          contentType: z.enum(["image/png", "image/jpg", "image/jpeg"]),
        })
      )
      .optional(),
  }),
  selectedVisibilityType: z.enum(["public", "private"]),
  selectedTools: z.array(toolSchema).optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

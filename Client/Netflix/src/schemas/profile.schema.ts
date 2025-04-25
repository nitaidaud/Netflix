import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) =>
            [
              "image/png",
              "image/jpeg",
              "image/jpg",
              "image/svg+xml",
              "image/gif",
            ].includes(file.type),
          { message: "Invalid image file type" },
        ),
      z.undefined(),
    ])
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

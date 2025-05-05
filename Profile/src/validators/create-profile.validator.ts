import { body } from "express-validator";

export const validateProfileData = () => [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("image")
    .custom((_, { req }) => {
      const file = req.file;
      if (!file) return true;

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("Invalid image file type");
      }
      return true;
    })
    .optional(),
];

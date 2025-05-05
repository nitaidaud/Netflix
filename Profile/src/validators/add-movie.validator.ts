import { body } from "express-validator";

export const validateMovie = () => [
  body("id")
    .isInt({ min: 1 })
    .withMessage("ID must be a positive integer"),

  body("adult")
    .isBoolean()
    .withMessage("Adult must be a boolean"),

  body("backdrop_path")
    .isString()
    .notEmpty()
    .withMessage("Backdrop path is required"),

  body("overview")
    .isString()
    .notEmpty()
    .withMessage("Overview is required"),

  body("popularity")
    .isFloat({ min: 0 })
    .withMessage("Popularity must be a non-negative number"),

  body("poster_path")
    .isString()
    .notEmpty()
    .withMessage("Poster path is required"),

  body("release_date")
    .isISO8601()
    .toDate()
    .withMessage("Release date must be a valid date (ISO8601)"),

  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required"),

  body("type")
    .isIn(["MOVIE", "SHOW"]) // adjust based on your actual Prisma `Type` enum values
    .withMessage("Type must be one of: MOVIE, SHOW"),
];

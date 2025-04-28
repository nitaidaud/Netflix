import { body } from "express-validator";

export const validateSignin = () => [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

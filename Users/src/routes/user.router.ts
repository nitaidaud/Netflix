import { Request, Response, Router } from "express";
import { TOKENS } from "../../tokens";
import { container } from "../config/inversify";
import { UserController } from "../controllers/user.controller";
import { validateSignup } from "../validators/signup.validator";
import { handleValidationErrors } from "../middleware/handleValidationErrors.middleware";
import { validateSignin } from "../validators/signin.validator";
import { validateUpdate } from "../validators/update.validator";

const userRouter = Router();

const userController = container.get<UserController>(TOKENS.UserController);

userRouter.post(
  "/signup",
  validateSignup(),
  handleValidationErrors,
  (req: Request, res: Response) => {
    userController.signup(req, res);
  },
);

userRouter.post(
  "/login",
  validateSignin(),
  handleValidationErrors,
  (req: Request, res: Response) => {
    userController.login(req, res);
  },
);

userRouter.post("/logout", (req: Request, res: Response) => {
  userController.logout(req, res);
});

userRouter.get("/:id", (req: Request, res: Response) => {
  userController.getUser(req, res);
});

userRouter.post(
  "/update",
  validateUpdate(),
  handleValidationErrors,
  (req: Request, res: Response) => {
    userController.updateUser(req, res);
  },
);

userRouter.post("/send-email", (req: Request, res: Response) => {
  userController.sendVerificationMail(req, res);
});

userRouter.post("/reset-password/:id", (req: Request, res: Response) => {
  userController.resetPassword(req, res);
});

userRouter.post("/forgot-password", (req: Request, res: Response) => {
  userController.sendMailForgotPassword(req, res);
});

export { userRouter };

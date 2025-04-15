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

userRouter.get("/get-user", (req: Request, res: Response) => {
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
  console.log("send email");
  
  userController.sendVerificationMail(req, res);
});

userRouter.post("/verify-email/:tokenId", (req: Request, res: Response) => {
  userController.verifyEmail(req, res);
});

userRouter.post("/reset-password/:token", (req: Request, res: Response) => {
  userController.resetPassword(req, res);
});

userRouter.post("/forgot-password", (req: Request, res: Response) => {
  userController.sendMailForgotPassword(req, res);
});

userRouter.post("/check-auth", (req: Request, res: Response) => {
  userController.checkAuth(req, res);
});

export { userRouter };

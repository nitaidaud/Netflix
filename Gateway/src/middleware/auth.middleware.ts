import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt";

const publicRoutes = [
  "/api/users/login",
  "/api/users/signup",
  "/api/users/send-email",
  "/api/users/verify-email/:tokenId",
  "/api/users/reset-password/:token",
  "/api/users/forgot-password",
  "/api/users/check-auth",
  "/api/users/check-logged-in",
];

const userRoutes = ["/api/profiles/delete-profile", "/api/payments/create"];

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const isPublic = publicRoutes.some((route) =>
    req.originalUrl.startsWith(route),
  );

  const isUserRoute = userRoutes.some((route) =>
    req.originalUrl.startsWith(route),
  );

  if (isPublic) {
    next();
    return;
  }

  const token = req.cookies?.Token;

  const user = verify(token);

  if (!user) {
    res.status(401).json({ message: "Unauthorized", success: false });
    return;
  }

  if (isUserRoute) {
    next();
    return;
  }

  next();
};

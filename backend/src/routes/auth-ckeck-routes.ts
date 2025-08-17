import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";

export const AuthCheckRoute = Router();
AuthCheckRoute.get("/auth/check", AuthMiddleware, (req, res) => {
    const user = (req as any).user;
    res.json({ user });
});

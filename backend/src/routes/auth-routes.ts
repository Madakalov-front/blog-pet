import { Router } from "express";
import { AuthController } from "../controllers";

export const AuthRoute = Router();
AuthRoute.post("/auth", AuthController);

import { Router } from "express";
import { RegisterController } from "../controllers";

export const RegisterRoute = Router();
RegisterRoute.post("/register", RegisterController);

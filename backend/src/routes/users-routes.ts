import { Router } from "express";
import { UsersController } from "../controllers";

export const UsersRoute = Router();
UsersRoute.get("/users", UsersController);

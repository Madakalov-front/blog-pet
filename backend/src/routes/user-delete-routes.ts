import { Router } from "express";
import { UserDeleteController } from "../controllers";

export const UserDeleteRoute = Router();
UserDeleteRoute.delete("/users/:id", UserDeleteController);

import { Router } from "express";
import { UserEditRoleController } from "../controllers";

export const UserEditRoleRoute = Router();
UserEditRoleRoute.patch("/users/:id/edit-role", UserEditRoleController);

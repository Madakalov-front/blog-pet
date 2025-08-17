import { Router } from "express";
import { PostEditController } from "../controllers/post-edit-controller";

export const PostEditRoute = Router();
PostEditRoute.patch("/post-edit/:id", PostEditController);

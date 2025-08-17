import { Router } from "express";
import { PostController } from "../controllers/post-controller";

export const PostRoute = Router();
PostRoute.get("/posts/:id", PostController);

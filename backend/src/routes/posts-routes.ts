import { Router } from "express";
import { PostsController } from "../controllers/posts-controller";

export const PostsRoute = Router();
PostsRoute.get("/posts", PostsController);

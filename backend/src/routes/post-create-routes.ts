import { Router } from "express";
import { PostCreateController } from "../controllers";

export const PostCreateRoute = Router();
PostCreateRoute.post("/new-article", PostCreateController);

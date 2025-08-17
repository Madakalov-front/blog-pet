import { Router } from "express";
import { CommentCreateController } from "../controllers";

export const CommentCreateRoute = Router();
CommentCreateRoute.post("/comment-create", CommentCreateController);

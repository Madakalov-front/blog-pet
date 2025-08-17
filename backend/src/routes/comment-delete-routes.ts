import { Router } from "express";
import { CommentDeleteController } from "../controllers";

export const CommentDeleteRoute = Router();
CommentDeleteRoute.delete("/comment-delete", CommentDeleteController);

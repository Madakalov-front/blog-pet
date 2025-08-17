import { Router } from "express";
import { CommentsForPostController } from "../controllers/comments-for-controller";

export const CommentsForPostRoute = Router();
CommentsForPostRoute.get(
  "/posts/:fk_post_id/comments",
  CommentsForPostController
);

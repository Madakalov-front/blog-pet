import { Router } from "express";
import { PostRemoveController } from "../controllers/post-remove-controller";

export const PostRemoveRoute = Router();
PostRemoveRoute.delete("/post-remove/:id", PostRemoveController);

import { Router } from "express";
import { PostsSearchController } from "../controllers";

export const PostsSearchRoute = Router();
PostsSearchRoute.get("/search-post/:slug", PostsSearchController);

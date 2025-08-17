import express, { Application } from "express";
import cors from "cors";
import {
  AuthCheckRoute,
  AuthRoute,
  CommentCreateRoute,
  CommentDeleteRoute,
  CommentsForPostRoute,
  PostCreateRoute,
  PostEditRoute,
  PostRemoveRoute,
  PostRoute,
  PostsRoute,
  PostsSearchRoute,
  RegisterRoute,
  UserDeleteRoute,
  UserEditRoleRoute,
  UsersRoute,
} from "./routes";

const app: Application = express();
const port: number = 8080;
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["Authorization"],
  })
);

const defaultUrl = "/";

app.use(defaultUrl, RegisterRoute);

app.use(defaultUrl, AuthRoute);
app.use(defaultUrl, AuthCheckRoute);

app.use(defaultUrl, UsersRoute);
app.use(defaultUrl, UserEditRoleRoute);
app.use(defaultUrl, UserDeleteRoute);

app.use(defaultUrl, PostsRoute);
app.use(defaultUrl, PostRoute);
app.use(defaultUrl, PostEditRoute);
app.use(defaultUrl, PostRemoveRoute);
app.use(defaultUrl, PostCreateRoute);
app.use(defaultUrl, PostsSearchRoute);

app.use(defaultUrl, CommentsForPostRoute);
app.use(defaultUrl, CommentCreateRoute);
app.use(defaultUrl, CommentDeleteRoute);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

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
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: [
        "https://blog-pet-seven.vercel.app",
        "http://localhost:5173",
        "https://blog-pet.onrender.com", // Добавьте это
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Добавьте OPTIONS
    credentials: true,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Accept",
    ],
    exposedHeaders: ["Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use(express.json());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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

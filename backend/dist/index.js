"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://blog-pet-seven.vercel.app/", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Authorization"],
}));
const defaultUrl = "/";
app.use(defaultUrl, routes_1.RegisterRoute);
app.use(defaultUrl, routes_1.AuthRoute);
app.use(defaultUrl, routes_1.AuthCheckRoute);
app.use(defaultUrl, routes_1.UsersRoute);
app.use(defaultUrl, routes_1.UserEditRoleRoute);
app.use(defaultUrl, routes_1.UserDeleteRoute);
app.use(defaultUrl, routes_1.PostsRoute);
app.use(defaultUrl, routes_1.PostRoute);
app.use(defaultUrl, routes_1.PostEditRoute);
app.use(defaultUrl, routes_1.PostRemoveRoute);
app.use(defaultUrl, routes_1.PostCreateRoute);
app.use(defaultUrl, routes_1.PostsSearchRoute);
app.use(defaultUrl, routes_1.CommentsForPostRoute);
app.use(defaultUrl, routes_1.CommentCreateRoute);
app.use(defaultUrl, routes_1.CommentDeleteRoute);
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});

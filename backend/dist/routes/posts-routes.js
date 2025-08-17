"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRoute = void 0;
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts-controller");
exports.PostsRoute = (0, express_1.Router)();
exports.PostsRoute.get("/posts", posts_controller_1.PostsController);

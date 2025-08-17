"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSearchRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.PostsSearchRoute = (0, express_1.Router)();
exports.PostsSearchRoute.get("/search-post/:slug", controllers_1.PostsSearchController);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreateRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.CommentCreateRoute = (0, express_1.Router)();
exports.CommentCreateRoute.post("/comment-create", controllers_1.CommentCreateController);

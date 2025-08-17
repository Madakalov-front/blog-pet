"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDeleteRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.CommentDeleteRoute = (0, express_1.Router)();
exports.CommentDeleteRoute.delete("/comment-delete", controllers_1.CommentDeleteController);

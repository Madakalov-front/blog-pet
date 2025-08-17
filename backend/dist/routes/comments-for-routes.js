"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsForPostRoute = void 0;
const express_1 = require("express");
const comments_for_controller_1 = require("../controllers/comments-for-controller");
exports.CommentsForPostRoute = (0, express_1.Router)();
exports.CommentsForPostRoute.get("/posts/:fk_post_id/comments", comments_for_controller_1.CommentsForPostController);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEditRoute = void 0;
const express_1 = require("express");
const post_edit_controller_1 = require("../controllers/post-edit-controller");
exports.PostEditRoute = (0, express_1.Router)();
exports.PostEditRoute.patch("/post-edit/:id", post_edit_controller_1.PostEditController);

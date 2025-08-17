"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const express_1 = require("express");
const post_controller_1 = require("../controllers/post-controller");
exports.PostRoute = (0, express_1.Router)();
exports.PostRoute.get("/posts/:id", post_controller_1.PostController);

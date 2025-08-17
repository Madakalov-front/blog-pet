"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRemoveRoute = void 0;
const express_1 = require("express");
const post_remove_controller_1 = require("../controllers/post-remove-controller");
exports.PostRemoveRoute = (0, express_1.Router)();
exports.PostRemoveRoute.delete("/post-remove/:id", post_remove_controller_1.PostRemoveController);

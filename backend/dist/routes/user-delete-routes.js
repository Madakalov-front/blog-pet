"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.UserDeleteRoute = (0, express_1.Router)();
exports.UserDeleteRoute.delete("/users/:id", controllers_1.UserDeleteController);

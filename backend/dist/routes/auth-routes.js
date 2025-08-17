"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.AuthRoute = (0, express_1.Router)();
exports.AuthRoute.post("/auth", controllers_1.AuthController);

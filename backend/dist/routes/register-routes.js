"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.RegisterRoute = (0, express_1.Router)();
exports.RegisterRoute.post("/register", controllers_1.RegisterController);

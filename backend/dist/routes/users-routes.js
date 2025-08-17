"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.UsersRoute = (0, express_1.Router)();
exports.UsersRoute.get("/users", controllers_1.UsersController);

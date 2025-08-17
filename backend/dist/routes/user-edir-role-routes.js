"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEditRoleRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.UserEditRoleRoute = (0, express_1.Router)();
exports.UserEditRoleRoute.patch("/users/:id/edit-role", controllers_1.UserEditRoleController);

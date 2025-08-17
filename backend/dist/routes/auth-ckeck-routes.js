"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCheckRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
exports.AuthCheckRoute = (0, express_1.Router)();
exports.AuthCheckRoute.get("/auth/check", auth_middleware_1.AuthMiddleware, (req, res) => {
    const user = req.user;
    res.json({ user });
});

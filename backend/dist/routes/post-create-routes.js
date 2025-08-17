"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateRoute = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.PostCreateRoute = (0, express_1.Router)();
exports.PostCreateRoute.post("/new-article", controllers_1.PostCreateController);

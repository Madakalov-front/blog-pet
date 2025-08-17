"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const db_1 = __importDefault(require("../db"));
const UsersController = async (req, res) => {
    try {
        const data = await db_1.default.query("SELECT id, login, register_at, role_id FROM users");
        if (!data.rows.length) {
            return res.status(404).json({ error: "Пользователи не найдены" });
        }
        res.status(200).json(data.rows);
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка сервера при запросе пользователей" });
    }
};
exports.UsersController = UsersController;

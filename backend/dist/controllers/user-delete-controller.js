"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteController = void 0;
const db_1 = __importDefault(require("../db"));
const UserDeleteController = async (req, res) => {
    const { id } = req.body;
    try {
        const data = await db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING *", [
            id,
        ]);
        if (data.rowCount === 0) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }
        res
            .status(200)
            .json({ message: "Пользователь удалён", user: data.rows[0] });
    }
    catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
        res.status(500).json({ error: "Ошибка сервера при удалении пользователя" });
    }
};
exports.UserDeleteController = UserDeleteController;

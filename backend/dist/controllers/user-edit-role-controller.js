"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEditRoleController = void 0;
const db_1 = __importDefault(require("../db"));
const UserEditRoleController = async (req, res) => {
    const { id, role_id } = req.body;
    try {
        const data = await db_1.default.query("UPDATE users SET role_id = $1 WHERE id = $2 RETURNING *", [role_id, id]);
        if (!data.rows[0]) {
            return res.status(404).json({ error: "Такой пользователь не найден!" });
        }
        res.status(200).json(data.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Ошибка сервера при смене роли" });
    }
};
exports.UserEditRoleController = UserEditRoleController;

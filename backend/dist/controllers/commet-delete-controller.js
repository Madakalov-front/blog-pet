"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDeleteController = void 0;
const db_1 = __importDefault(require("../db"));
const CommentDeleteController = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(500).json({ error: "Некорректный id" });
    }
    try {
        const data = await db_1.default.query(`
        DELETE FROM comments WHERE id = $1
        RETURNING *
        `, [id]);
        if (data.rowCount === 0) {
            return res.status(404).json({ error: "Комментарий не найден" });
        }
        return res
            .status(200)
            .json({ message: "Комментарий удалён", deleted: data.rows[0] });
    }
    catch (error) {
        console.error("Ошибка при удалении комментария:", error);
        return res
            .status(500)
            .json({ error: "Ошибка сервера при удалении комментария" });
    }
};
exports.CommentDeleteController = CommentDeleteController;

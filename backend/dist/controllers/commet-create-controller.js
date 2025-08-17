"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreateController = void 0;
const db_1 = __importDefault(require("../db"));
const CommentCreateController = async (req, res) => {
    const { name, comment, fk_post_id } = req.body;
    if (!comment) {
        return res.status(400).json({ error: "Комментарий обязателен" });
    }
    try {
        const data = await db_1.default.query(`
        INSERT INTO comments(name, comment, fk_post_id)
        VALUES($1, $2, $3)
        RETURNING *;
    `, [name, comment, fk_post_id]);
        if (!data.rowCount) {
            return res.status(500).json({ error: "Ошибка при создании комментария" });
        }
        res.status(201).json(data.rows[0]);
    }
    catch (error) {
        console.error("Ошибка при создании комментария:", error);
        return res.status(500).json({ error: "Непредвиденная ошибка сервера" });
    }
};
exports.CommentCreateController = CommentCreateController;

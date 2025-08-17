"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const db_1 = __importDefault(require("../db"));
const PostController = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await db_1.default.query("SELECT * FROM posts WHERE id = $1", [
            Number(id),
        ]);
        if (!post.rows.length) {
            return res.status(404).json({ error: "Запрашиваемый пост не найден" });
        }
        res.status(200).json(post.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: 'Ошибка при запросе поста' });
    }
};
exports.PostController = PostController;

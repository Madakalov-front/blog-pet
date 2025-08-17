"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsSearchController = void 0;
const db_1 = __importDefault(require("../db"));
const PostsSearchController = async (req, res) => {
    const { slug } = req.params;
    if (!slug || slug.trim() === "") {
        return res.status(400).json({ error: "Параметр slug обязателен" });
    }
    try {
        const pattern = `%${slug}%`;
        const result = await db_1.default.query(`SELECT id, slug, title FROM posts WHERE slug ILIKE $1`, [pattern]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Нет совпадений" });
        }
        return res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Ошибка при поиске постов:", error);
        return res.status(500).json({ error: "Ошибка при поиске постов" });
    }
};
exports.PostsSearchController = PostsSearchController;

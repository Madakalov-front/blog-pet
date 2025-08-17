"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCreateController = void 0;
const db_1 = __importDefault(require("../db"));
const PostCreateController = async (req, res) => {
    const { title, content, image_url, slug } = req.body;
    console.log(req.body);
    try {
        const data = await db_1.default.query(`INSERT INTO posts (title, content, image_url, slug)
        VALUES($1, $2, $3, $4)
        RETURNING *`, [title, content, image_url, slug]);
        console.log(data);
        if (!data.rowCount) {
            return res.status(500).json({ error: "Ошибка при создании поста" });
        }
        res
            .status(201)
            .json({ message: "Пост успешно создан", post: data.rows[0] });
    }
    catch (error) {
        console.error("Ошибка при создании поста:", error);
        return res.status(500).json({ error: "Ошибка при создании поста" });
    }
};
exports.PostCreateController = PostCreateController;

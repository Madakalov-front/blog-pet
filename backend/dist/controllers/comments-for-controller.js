"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsForPostController = void 0;
const db_1 = __importDefault(require("../db"));
const CommentsForPostController = async (req, res) => {
    const { fk_post_id } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM comments WHERE fk_post_id = $1", [Number(fk_post_id)]);
        return res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Ошибка при получении комментариев:", error);
        return res.status(500).json({
            error: "Ошибка сервера при получении комментариев",
        });
    }
};
exports.CommentsForPostController = CommentsForPostController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRemoveController = void 0;
const db_1 = __importDefault(require("../db"));
const PostRemoveController = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await db_1.default.query("DELETE FROM posts WHERE id = $1", [
            Number(id),
        ]);
        if (!data.rowCount) {
            return res.status(404).json({
                error: "Пост не найден, проверьте название в адресной строке!",
            });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: `Ошибка сервера - ${error}` });
    }
};
exports.PostRemoveController = PostRemoveController;

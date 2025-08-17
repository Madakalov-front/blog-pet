"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../db"));
dotenv_1.default.config();
const AuthMiddleware = async (req, res, next) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({ message: "Нет токена в заголовке" });
    }
    if (!authToken.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Неверный формат токена" });
    }
    const token = authToken.split(" ")[1];
    if (!token || token.length < 10) {
        return res.status(401).json({ message: "Неверный формат токена" });
    }
    try {
        const SECRET_KEY = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: "Токен просрочен" });
        }
        const session = await db_1.default.query("SELECT * FROM sessions WHERE token = $1", [
            token,
        ]);
        const role_id = await db_1.default.query("SELECT role_id FROM users WHERE id = $1", [
            decoded.id,
        ]);
        decoded.role_id = role_id.rows[0].role_id;
        if (session.rowCount === 0) {
            return res.status(401).json({ message: "Сессия не найдена." });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("JWT verification error:", error);
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ message: "Токен просрочен" });
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: "Недействительный токен" });
        }
        return res.status(401).json({ message: "Ошибка аутентификации" });
    }
};
exports.AuthMiddleware = AuthMiddleware;

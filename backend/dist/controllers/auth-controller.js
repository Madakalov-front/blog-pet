"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const normalized_login_1 = require("../utils/normalized-login");
const AuthController = async (req, res) => {
    const { login, password } = req.body;
    console.log(req.body);
    if (!login) {
        return res.status(400).json({ error: "Логин обязателен", type: "login" });
    }
    if (!password) {
        return res
            .status(400)
            .json({ error: "Пароль обязателен", type: "password" });
    }
    dotenv_1.default.config();
    const normalizedLogin = (0, normalized_login_1.NormalizedLogin)(login);
    try {
        const result = await db_1.default.query("SELECT * FROM users WHERE login = $1", [
            normalizedLogin,
        ]);
        if (!result.rows.length)
            return res.status(401).json({ error: "Неверный логин", type: "login" });
        const user = result.rows[0];
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ error: "Неверный пароль", type: "password" });
        const { id, login, role_id, was_logout, register_at } = user;
        const payload = {
            role_id,
            login,
            id,
            was_logout,
            register_at,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        await db_1.default.query(`INSERT INTO sessions 
       (user_id, token, expires_at, user_agent, ip_address)
       VALUES ($1, $2, NOW() + INTERVAL '7 days', $3, $4)`, [user.id, token, req.headers["user-agent"] || "", req.ip]);
        res.status(200).json({
            message: "Пользователь авторизован",
            token,
            user: { id, login, role_id, was_logout, register_at },
        });
    }
    catch (error) {
        console.error("Ошибка при авторизации:", error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
};
exports.AuthController = AuthController;

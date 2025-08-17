"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const normalized_login_1 = require("../utils/normalized-login");
const RegisterController = async (req, res) => {
    const { login, password } = req.body;
    console.log(req.body);
    if (!login) {
        return res.status(400).json({ error: "Логин обязателен" });
    }
    if (!password) {
        return res.status(400).json({ error: "Пароль обязателен" });
    }
    const normalizedLogin = (0, normalized_login_1.NormalizedLogin)(login);
    try {
        const existingUser = await db_1.default.query("SELECT id FROM users WHERE login = $1", [normalizedLogin]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ error: "Логин уже занят" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const result = await db_1.default.query(`INSERT INTO users (login, password, register_at)
       VALUES ($1, $2, NOW())
       RETURNING login`, [normalizedLogin, hashedPassword]);
        res.status(201).json({
            message: "Пользователь зарегистрирован",
            user: result.rows[0],
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Ошибка регистрации:", error);
        }
        res.status(500).json({ error: "Ошибка сервера" });
    }
};
exports.RegisterController = RegisterController;

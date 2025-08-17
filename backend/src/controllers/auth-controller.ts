import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NormalizedLogin } from "../utils/normalized-login";

export const AuthController = async (req: Request, res: Response) => {
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
  dotenv.config();
  const normalizedLogin = NormalizedLogin(login);
  try {
    const result = await db.query("SELECT * FROM users WHERE login = $1", [
      normalizedLogin,
    ]);
    if (!result.rows.length)
      return res.status(401).json({ error: "Неверный логин", type: "login" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
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

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    await db.query(
      `INSERT INTO sessions 
       (user_id, token, expires_at, user_agent, ip_address)
       VALUES ($1, $2, NOW() + INTERVAL '7 days', $3, $4)`,
      [user.id, token, req.headers["user-agent"] || "", req.ip]
    );

    res.status(200).json({
      message: "Пользователь авторизован",
      token,
      user: { id, login, role_id, was_logout, register_at },
    });
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
};

import { Request, Response } from "express";
import db from "../db";
import bcrypt from "bcrypt";
import { NormalizedLogin } from "../utils/normalized-login";

export const RegisterController = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  console.log(req.body);
  if (!login) {
    return res.status(400).json({ error: "Логин обязателен" });
  }
  if (!password) {
    return res.status(400).json({ error: "Пароль обязателен" });
  }

  const normalizedLogin = NormalizedLogin(login);

  try {
    const existingUser = await db.query(
      "SELECT id FROM users WHERE login = $1",
      [normalizedLogin]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Логин уже занят" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
      `INSERT INTO users (login, password, register_at)
       VALUES ($1, $2, NOW())
       RETURNING login`,
      [normalizedLogin, hashedPassword]
    );
    res.status(201).json({
      message: "Пользователь зарегистрирован",
      user: result.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка регистрации:", error);
    }
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

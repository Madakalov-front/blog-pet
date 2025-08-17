import { Request, Response } from "express";
import db from "../db";

export const UsersController = async (req: Request, res: Response) => {
  try {
    const data = await db.query(
      "SELECT id, login, register_at, role_id FROM users"
    );
    if (!data.rows.length) {
      return res.status(404).json({ error: "Пользователи не найдены" });
    }

    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера при запросе пользователей" });
  }
};

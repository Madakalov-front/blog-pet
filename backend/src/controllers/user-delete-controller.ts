import { Request, Response } from "express";
import db from "../db";

export const UserDeleteController = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const data = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [
      id,
    ]);
    if (data.rowCount === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res
      .status(200)
      .json({ message: "Пользователь удалён", user: data.rows[0] });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ error: "Ошибка сервера при удалении пользователя" });
  }
};

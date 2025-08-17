import { Request, Response } from "express";
import db from "../db";

export const UserEditRoleController = async (req: Request, res: Response) => {
  const { id, role_id } = req.body;
  try {
    const data = await db.query(
      "UPDATE users SET role_id = $1 WHERE id = $2 RETURNING *",
      [role_id, id]
    );
    if (!data.rows[0]) {
      return res.status(404).json({ error: "Такой пользователь не найден!" });
    }
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера при смене роли" });
  }
};

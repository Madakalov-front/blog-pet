import { Request, Response } from "express";
import db from "../db";

export const CommentCreateController = async (req: Request, res: Response) => {
  const { name, comment, fk_post_id } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Комментарий обязателен" });
  }

  try {
    const data = await db.query(
      `
        INSERT INTO comments(name, comment, fk_post_id)
        VALUES($1, $2, $3)
        RETURNING *;
    `,
      [name, comment, fk_post_id]
    );
    if (!data.rowCount) {
      return res.status(500).json({ error: "Ошибка при создании комментария" });
    }
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.error("Ошибка при создании комментария:", error);
    return res.status(500).json({ error: "Непредвиденная ошибка сервера" });
  }
};

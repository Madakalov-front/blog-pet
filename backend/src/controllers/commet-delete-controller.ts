import { Request, Response } from "express";
import db from "../db";

export const CommentDeleteController = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(500).json({ error: "Некорректный id" });
  }
  try {
    const data = await db.query(
      `
        DELETE FROM comments WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    if (data.rowCount === 0) {
      return res.status(404).json({ error: "Комментарий не найден" });
    }

    return res
      .status(200)
      .json({ message: "Комментарий удалён", deleted: data.rows[0] });
  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    return res
      .status(500)
      .json({ error: "Ошибка сервера при удалении комментария" });
  }
};

import { Request, Response } from "express";
import db from "../db";

export const CommentsForPostController = async (
  req: Request,
  res: Response
) => {
  const { fk_post_id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM comments WHERE fk_post_id = $1",
      [Number(fk_post_id)]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    return res.status(500).json({
      error: "Ошибка сервера при получении комментариев",
    });
  }
};

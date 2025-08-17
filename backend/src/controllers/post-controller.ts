import { Request, Response } from "express";
import db from "../db";

export const PostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await db.query("SELECT * FROM posts WHERE id = $1", [
      Number(id),
    ]);
    if (!post.rows.length) {
      return res.status(404).json({ error: "Запрашиваемый пост не найден" });
    }
    res.status(200).json(post.rows[0]);
  } catch (error) {
       res.status(500).json({error: 'Ошибка при запросе поста'});
  }
};

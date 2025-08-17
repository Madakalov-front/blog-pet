import { Request, Response } from "express";
import db from "../db";

export const PostEditController = async (req: Request, res: Response) => {
  const { id, title, slug, image_url, content } = req.body;

  try {
    const post = await db.query("SELECT * FROM posts WHERE id = $1", [
      Number(id),
    ]);
    if (!post.rows.length) {
      return res.status(404).json({ error: "Запрашиваемый пост не найден" });
    }
    const updatedPost = await db.query(
      `UPDATE posts 
       SET title = $1, slug = $2, image_url = $3, content = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [title, slug, image_url, content, Number(id)]
    );
    return res.status(200).json(updatedPost.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ error: "Произошла ошибка при обновлении поста" });
  }
};

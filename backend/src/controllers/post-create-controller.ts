import { Request, Response } from "express";
import db from "../db";

export const PostCreateController = async (req: Request, res: Response) => {
  const { title, content, image_url, slug } = req.body;
  console.log(req.body);
  try {
    const data = await db.query(
      `INSERT INTO posts (title, content, image_url, slug)
        VALUES($1, $2, $3, $4)
        RETURNING *`,
      [title, content, image_url, slug]
    );
    console.log(data);
    if (!data.rowCount) {
      return res.status(500).json({ error: "Ошибка при создании поста" });
    }

    res
      .status(201)
      .json({ message: "Пост успешно создан", post: data.rows[0] });
  } catch (error) {
    console.error("Ошибка при создании поста:", error);
    return res.status(500).json({ error: "Ошибка при создании поста" });
  }
};

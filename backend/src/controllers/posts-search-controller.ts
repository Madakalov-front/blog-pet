import { Request, Response } from "express";
import db from "../db";

export const PostsSearchController = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug || slug.trim() === "") {
    return res.status(400).json({ error: "Параметр slug обязателен" });
  }

  try {
    const pattern = `%${slug}%`;
    const result = await db.query(
      `SELECT id, slug, title FROM posts WHERE slug ILIKE $1`,
      [pattern]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Нет совпадений" });
    }

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Ошибка при поиске постов:", error);
    return res.status(500).json({ error: "Ошибка при поиске постов" });
  }
};

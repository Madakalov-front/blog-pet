import { Request, Response } from "express";
import db from "../db";

export const PostRemoveController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await db.query("DELETE FROM posts WHERE id = $1", [
      Number(id),
    ]);

    if (!data.rowCount) {
      return res.status(404).json({
        error: "Пост не найден, проверьте название в адресной строке!",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: `Ошибка сервера - ${error}` });
  }
};

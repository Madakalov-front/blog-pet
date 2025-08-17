import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../db";

dotenv.config();

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Нет токена в заголовке" });
  }

  if (!authToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Неверный формат токена" });
  }

  const token = authToken.split(" ")[1];
  if (!token || token.length < 10) {
    return res.status(401).json({ message: "Неверный формат токена" });
  }
  try {
    const SECRET_KEY = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, SECRET_KEY) as {
      exp: number;
      id: "string";
      role_id: number;
    };

    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Токен просрочен" });
    }

    const session = await db.query("SELECT * FROM sessions WHERE token = $1", [
      token,
    ]);
    const role_id = await db.query("SELECT role_id FROM users WHERE id = $1", [
      decoded.id,
    ]);

    decoded.role_id = role_id.rows[0].role_id;

    if (session.rowCount === 0) {
      return res.status(401).json({ message: "Сессия не найдена." });
    }
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Токен просрочен" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Недействительный токен" });
    }

    return res.status(401).json({ message: "Ошибка аутентификации" });
  }
};

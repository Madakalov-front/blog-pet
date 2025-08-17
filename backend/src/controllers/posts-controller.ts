import { Request, Response } from "express";
import db from "../db";

export const PostsController = async (req: Request, res: Response) => {
  try {
    const { current_page, limit } = req.query;
    let dataQueryPosts = `SELECT * FROM posts`;
    let countQuery = "SELECT COUNT(*) AS total FROM posts";
    let total = 0;
    const params: (string | number)[] = [];
    let paramCounter = 1;
    const countResult = await db.query(countQuery, params);
    total = Number(countResult.rows[0].total);

    if (current_page && limit) {
      const pageNum = Number(current_page);
      const limitNum = Number(limit);
      const offset = (pageNum - 1) * limitNum;

      dataQueryPosts += ` ORDER BY published_at DESC LIMIT $${paramCounter} OFFSET $${
        paramCounter + 1
      }`;
      params.push(limitNum, offset);
      paramCounter += 2;
    } else {
      dataQueryPosts += " ORDER BY published_at DESC";
    }

    const postResult = await db.query(dataQueryPosts, params);

    const response: any = {
      posts: postResult.rows,
    };

    if (current_page && limit) {
      response.pagination = {
        current_page: Number(current_page),
        limit: Number(limit),
        total_pages: Math.ceil(total / Number(limit)),
      };
    }

    res.json(response);
  } catch (error) {
    console.error("Error in PostsController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

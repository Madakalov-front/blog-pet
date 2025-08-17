"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsController = void 0;
const db_1 = __importDefault(require("../db"));
const PostsController = async (req, res) => {
    try {
        const { current_page, limit } = req.query;
        let dataQueryPosts = `SELECT * FROM posts`;
        let countQuery = "SELECT COUNT(*) AS total FROM posts";
        let total = 0;
        const params = [];
        let paramCounter = 1;
        const countResult = await db_1.default.query(countQuery, params);
        total = Number(countResult.rows[0].total);
        if (current_page && limit) {
            const pageNum = Number(current_page);
            const limitNum = Number(limit);
            const offset = (pageNum - 1) * limitNum;
            dataQueryPosts += ` ORDER BY published_at DESC LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
            params.push(limitNum, offset);
            paramCounter += 2;
        }
        else {
            dataQueryPosts += " ORDER BY published_at DESC";
        }
        const postResult = await db_1.default.query(dataQueryPosts, params);
        const response = {
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
    }
    catch (error) {
        console.error("Error in PostsController:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.PostsController = PostsController;

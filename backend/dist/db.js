"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "blog",
//   password: "qazwsx1234",
//   port: 5432,
// });
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // важно для Render PostgreSQL
});
exports.default = {
    query: (text, params) => pool.query(text, params),
};

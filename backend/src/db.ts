import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blog",
  password: "qazwsx1234",
  port: 5432,
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

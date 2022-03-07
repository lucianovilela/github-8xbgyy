import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.connectionString });
export const query = async (text, params) => {
  const client = await pool.connect();
  const result = await client.query(text, params);
  (await client).release();

  return result.rows;
};

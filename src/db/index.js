import { Pool } from 'pg';
console.log('connecting to database');
const pool = new Pool({ connectionString: process.env.connectionString });
export const query = async (text, params) => {
  const client = await pool.connect();
  const result = await client.query(text, params);
  (await client).release();

  return result.rows;
};

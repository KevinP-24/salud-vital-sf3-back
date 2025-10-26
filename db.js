import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.on('connect', async client => {
  await client.query('SET search_path TO vitalapp;');
  console.log('✅ Conectado a Supabase correctamente');
});

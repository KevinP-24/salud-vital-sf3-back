import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pkg

console.log('🧩 DATABASE_URL:', process.env.DATABASE_URL)

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.on('connect', async client => {
  console.log('✅ Conexión establecida con la BD')
  await client.query('SET search_path TO vitalapp;')
})


pool.on('error', err => {
  console.error('❌ Error en la conexión con PostgreSQL:', err)
})

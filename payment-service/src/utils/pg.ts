import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: `/cloudsql/node-gcp-dev-app:asia-south1:free-trial-first-project`,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  max: 10, // connection pool
  idleTimeoutMillis: 30000,
});

export default pool;
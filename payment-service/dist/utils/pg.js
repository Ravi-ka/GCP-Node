"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const pool = new Pool({
    user: process.env.PG_USER,
    host: `/cloudsql/node-gcp-dev-app:asia-south1:free-trial-first-project`,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    max: 10, // connection pool
    idleTimeoutMillis: 30000,
});
exports.default = pool;
//# sourceMappingURL=pg.js.map
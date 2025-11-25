import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

export const config = {
  port: Number.parseInt(process.env.PORT ?? '8080', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  adminAccessKey: process.env.ADMIN_ACCESS_KEY ?? 'dev-admin-key',
  dbFilePath: process.env.DB_FILE ?? path.join(projectRoot, 'data', 'pair-orders.db'),
  logLevel: process.env.LOG_LEVEL ?? 'info'
};

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config.js';
import ordersRouter from './routes/orderRoutes.js';
import catalogRouter from './routes/catalogRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/orders', ordersRouter);
app.use('/api/catalog', catalogRouter);
app.use(express.static(publicDir, { extensions: ['html'] }));

// Generic error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error' });
});

app.listen(config.port, () => {
  console.log(`Pair ordering agent listening on http://localhost:${config.port}`);
});

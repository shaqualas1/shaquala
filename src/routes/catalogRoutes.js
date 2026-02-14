import express from 'express';
import { catalog } from '../lib/catalog.js';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ data: catalog });
});

export default router;

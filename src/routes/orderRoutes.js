import express from 'express';
import { orderInputSchema } from '../lib/orderSchema.js';
import { config } from '../config.js';
import { createOrder, listOrders, findOrderById } from '../lib/orderRepository.js';
import { findCatalogItem } from '../lib/catalog.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const catalogItem = findCatalogItem(req.body?.pairType);
    const parsed = orderInputSchema.parse({
      ...req.body,
      catalogSnapshot: catalogItem
        ? {
            id: catalogItem.id,
            name: catalogItem.name,
            basePrice: catalogItem.basePrice,
            availableColors: catalogItem.availableColors
          }
        : undefined,
      rawPayload: req.body
    });

    const order = createOrder(parsed);
    res.status(201).json(order);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Validation failed',
        issues: error.issues
      });
    }
    next(error);
  }
});

router.get('/', (req, res) => {
  const providedKey = req.header('x-admin-key');
  if (providedKey !== config.adminAccessKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const limit = Number.parseInt(req.query.limit ?? '50', 10);
  const offset = Number.parseInt(req.query.offset ?? '0', 10);
  const orders = listOrders({ limit, offset });
  res.json({ data: orders, pagination: { limit, offset } });
});

router.get('/:orderId', (req, res) => {
  const providedKey = req.header('x-admin-key');
  if (providedKey !== config.adminAccessKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const order = findOrderById(req.params.orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

export default router;

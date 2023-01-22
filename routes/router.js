import express from 'express';
import { show, add, edit, remove } from '../controllers/ProductController.js';

const router = express.Router();

router.get('/products', show);
router.post('/products', add);
router.put('/products/:id', edit);
router.delete('/products/:id', remove);

export default router;

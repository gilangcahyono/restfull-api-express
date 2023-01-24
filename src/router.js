import express from 'express';
import * as api from './controller.js';

const router = express.Router();

router.get('/products', api.show);
router.get('/products/:id', api.showOne);
router.post('/products', api.add);
router.put('/products/:id', api.edit);
router.delete('/products/:id', api.remove);

export default router;

import express from 'express';
import * as collectionController from '../controllers/collectionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, collectionController.getAllCollections);
router.get('/:id', authenticateToken, collectionController.getCollectionById);
router.post('/', authenticateToken, collectionController.createCollection);
router.put('/:id', authenticateToken, collectionController.updateCollection);
router.delete('/:id', authenticateToken, collectionController.deleteCollection);

export default router;
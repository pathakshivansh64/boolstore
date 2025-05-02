import express from 'express';
import multer from 'multer';
import { addBook, getBooks, getBookById, buyBook } from '../controllers/bookController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', upload.single('image'), addBook);
router.post('/:id/buy', authenticate, buyBook);

export default router;
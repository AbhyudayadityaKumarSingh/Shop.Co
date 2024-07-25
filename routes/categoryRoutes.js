import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware';
import { createCategoryController } from '../controllers/CategoryController';
const router = express.Router();
 
router.post('create-category' , requireSignin , isAdmin , createCategoryController);
export default router;
import express from 'express';
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js'; // Add .js extension
import { createCategoryController , deleteCategoryController, getCategoriesController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js'; // Add .js extension

const router = express.Router();

// routes
//create category
router.post('/create-category', requireSignin, isAdmin, createCategoryController); // Add leading slash to the route
//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController); // Add leading slash to the route
//get All categories
 router.get('/categories', getCategoriesController); 
 //get single category
router.get('/single-category/:slug', getSingleCategoryController); 
//delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController); // Add leading slash to the route

export default router;
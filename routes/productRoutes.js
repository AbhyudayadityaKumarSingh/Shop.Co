import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductsController, getSingleProductsController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
import { get } from 'mongoose';
const router = express.Router();
//routes
router.post('/create-product', requireSignin, isAdmin,formidable() , createProductController);
//get all products
router.get('/get-products', getProductsController);

//get single product
router.get('/get-product/:slug', getSingleProductsController);
//get photo
router.get('/get-product/photo/:pid',productPhotoController);
//delete product
 router.delete('/delete-product/:pid', requireSignin, isAdmin, deleteProductController);
 //update product
 router.put('/update-product/:pid', requireSignin, isAdmin, formidable() , updateProductController);


export default router;
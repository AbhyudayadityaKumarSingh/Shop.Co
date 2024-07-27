import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { braintreePaymentsController, braintreeTokenController, createProductController, deleteProductController, getProductsController, getSingleProductsController, productCategoryController, productCountController, productListController, productPhotoController, productsFilterController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
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
 //filter product
router.post('/product-filters', productsFilterController);

//product count 
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page',  productListController);

//search product
router.post('/search/:keyword', searchProductController);

//similar products
router.get('/related-product/:pid/:cid', relatedProductController);

//category wise product
router.get('/product-category/:slug', productCategoryController);

//payment ROUTES
//token
router.get('/braintree/token' , braintreeTokenController);

//payment
router.post('/braintree/payment', requireSignin, braintreePaymentsController);



export default router;
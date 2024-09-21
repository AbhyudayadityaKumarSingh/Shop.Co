
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import slugify from 'slugify';
import braintree from "braintree";
import dotenv from 'dotenv';

import orderModel from "../models/categoryModel.js";
import { token } from "morgan";




dotenv.config();


export const createProductController =async(req,res) => {
    try{
        const {name,slug,price,category , quantity,description, shipping} = req.fields;
        const {photo} = req.files;

        //validation
        if(!name || !price || !category || !quantity || !description ){
            return res.status(500).send({
                success: false,
                message: "All fields are required"
            });
        }
        if(photo.size > 1000000){
            return res.status(500).send({
                success: false,
                message: "Image should be less than 1mb"
            });
        }
        const product = new productModel({
            ...req.fields,
            slug : slugify(name)
        }) ;
        if(photo) {
            product.photo.data = fs.readFileSync(photo.path) ;
            product.photo.contentType = photo.type ;
        }
        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product
        });  
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Product"
        });

    }
};
//get all products
export const getProductsController = async(req,res) => {
    try{
        const products = await productModel.find({}).populate('category').select('-photo').limit(10).sort({createdAt :-1}); 
        res.status(200).send({
            success: true,
            message: "All Products",
            products ,
            total: products.length
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting All Products" ,
            error: error.message
        });
    }
} ;

export const getSingleProductsController = async(req,res) => {
    try{
       const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate('category');
         if(!product){
              return res.status(404).send({
                success: false,
                message: "Product Not Found"
              });
         }
        res.status(200).send({
            success: true,
            message: "Single Product Received Successfully",
            product
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting Single Product" ,
            error: error.message
        });
    }
} ;

//get product photo
export const productPhotoController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select('photo');
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product Not Found"
            });
        }
        res.set('Content-Type', product.photo.contentType);
        res.status(200).send(product.photo.data);
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting Product Photo" ,
            error: error.message
        });
    }
} ;

export const deleteProductController = async(req,res) => {
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
            product
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Deleting Product" ,
            error: error.message
        });
    }
} ;

export const updateProductController = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.pid);
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product Not Found",
        });
      }
  
      const { name, price, category, quantity, description, shipping } = req.fields;
      const { photo } = req.files;
  
      // Validation
      if (!name || !price || !category || !quantity || !description) {
        return res.status(400).send({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check photo size if photo is provided
      if (photo && photo.size > 1000000) {
        return res.status(400).send({
          success: false,
          message: "Image should be less than 1mb",
        });
      }
  
      // Update product fields
      product.name = name;
      product.slug = slugify(name);
      product.price = price;
      product.category = category;
      product.quantity = quantity;
      product.description = description;
      product.shipping = shipping;
  
      // Update photo if provided
      if (photo) {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      }
  
      await product.save();
  
      res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Updating Product",
        error: error.message,
      });
    }
  };

  export const productsFilterController = async(req,res) => {
    try{
       const {checked,radio} = req.body;
       let args = {};
       if(checked.length > 0){
           args.category = checked;
       }
       if(radio.length) {
        args.price = {
            $gte: radio[0],
            $lte: radio[1]
        }
       }
       const products = await productModel.find(args).populate('category').select('-photo').limit(10).sort({createdAt :-1});
         res.status(200).send({
              success: true,
              message: "Filtered Products",
              products,
              total: products.length
         });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Filtering Products",
            error: error.message
        });
    }
  } ;
  
  export const productCountController = async(req,res) => { 
    try{
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "Product Count Received Successfully",
            total
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting Product Count",
            error: error.message
        })
    }
  } ;
//product list based on page
export const productListController = async(req,res) => {   
    try{
        const perPage = 2;
        const page = req.params.page || 1;
        const products = await productModel.find({}).populate('category').select('-photo').
        skip((perPage * (page-1 ))).
        limit(perPage).
        sort({createdAt :-1});

        res.status(200).send({ 
            success: true,
            message: "Product List Received Successfully",
            products,
            total: products.length
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Getting Product List",
            error: error.message
        });
    }

 } ;  


 // Search Product
 export const searchProductController = async (req, res) => {
    try{
      const {keyword} = req.params;
      const result = await productModel.find({
        $or: [
          {name: {$regex: keyword, $options: 'i'}},
          {description: {$regex: keyword, $options: 'i'}}
        ]
      }).populate('category').select('-photo');
      res.json(result)
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Searching Product",
            error: error.message
        });
    }
 };

 export const relatedProductController = async(req,res) => {
    try{
        const {pid,cid} = req.params;
        const products = await productModel.find({
            category: cid,
            _id: {$ne: pid}
        }).limit(4).select('-photo').populate('category');

        res.status(200).send({
            success: true,
            message: "Related Products Received Successfully",
            products
        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Getting Related Products",
            error: error.message
        });
    }
  } ;

export const productCategoryController = async(req,res) => {
    try{
         const category = await categoryModel.findOne({slug : req.params.slug});
         const products = await productModel.find({category: category._id}).populate('category').select('-photo');
         res.status(200).send({
             success: true,
             message: "Product Category Received Successfully",
             category,
             products
            });
    }
    catch(error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in Getting Product Category",
            error: error.message
        });
    }
} ;  


//payment gateway

// Initialize Braintree Gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

// Controller to generate Braintree token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, (err, response) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: "Error in Getting Token",
                    error: err.message
                });
            }
            res.send({
                success: true,
                token: response.clientToken , 
                
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting Token",
            error: error.message
        });
    }
};

// Controller to handle Braintree payments
// Controller to handle Braintree payments
export const braintreePaymentsController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;

        // Validate cart
        if (!Array.isArray(cart) || cart.length === 0) {
            return res.status(400).send({
                success: false,
                message: "Cart is empty or invalid"
            });
        }

        // Validate nonce
        if (!nonce) {
            return res.status(400).send({
                success: false,
                message: "Payment nonce is required"
            });
        }

        // Calculate total amount
        let total = 0;
        cart.forEach(p => {
            if (!p.price || typeof p.price !== 'number') {
                return res.status(400).send({
                    success: false,
                    message: "Invalid product data in cart"
                });
            }
            total += p.price;
        });

        // Create Braintree transaction
        gateway.transaction.sale({
            amount: total.toFixed(2), // Ensure the amount is in a proper format
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, async (err, result) => {
            if (err || !result.success) {
                console.error("Braintree transaction error:", err || result.message);
                return res.status(500).send({
                    success: false,
                    message: "Error in Payment",
                    error: err ? err.message : result.message
                });
            }

            // Log Braintree result
            console.log("Braintree result:", result);

            // Create new order
            const order = new orderModel({
                products: cart,
                payment: result.transaction,
                buyer: req.user._id
            });

            // Save order
            await order.save();

            res.status(200).send({
                success: true,
                message: "Payment Successful",
                order
            });
        });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Payment",
            error: error.message
        });
    }
};

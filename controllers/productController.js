
import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify';
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

export const updateProductController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid);
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Product Not Found"
            });
        }
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
        product.name = name;
        product.slug = slugify(name);
        product.price = price;
        product.category = category;
        product.quantity = quantity;
        product.description = description;
        product.shipping = shipping;
        if(photo) {
            product.photo.data = fs.readFileSync(photo.path) ;
            product.photo.contentType = photo.type ;
        }
        await product.save();
        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            product
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating Product" ,
            error: error.message
        });
    }
} ;
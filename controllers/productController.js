
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
}
import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';

export const createCategoryController = async(req,res) => {
    try{
        const {name} = req.body; 
        if(!name) {
            return res.status(401).send({
                message : 'Name is required'
            }) ;
        }
        const existingUser = await categoryModel.findOne({name});
        if(existingUser) {
            return res.status(200).send({
                success : true ,
                message : 'Category already exists'
            }) ;
        }
        const category = await new categoryModel({
            name ,
            slug : slugify(name)
        }).save();
        res.status(201).send({
            success : true ,
            message : 'Category created successfully',
            category
        });
        
    }
    catch{
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Category",
            error: error.message
        });
    }
} ;

export const updateCategoryController = async(req,res) => {
    try{ 
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id ,{name ,slug : slugify(name)} ,{new : true}) ;
        res.status(200).send({
            success : true ,
            message : 'Category Updated Successfully' ,
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Updating Category",
            error: error.message
        });
    }
} ;

export const getCategoriesController = async(req,res) => {
    try{
        const category = await categoryModel.find({}) ;
        res.status(200).send({
            success : true ,
            message : 'All Categories' ,
            category
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting All Categories",
            error: error.message
        });
    }
} ;

//single category
export const getSingleCategoryController = async(req,res) => {
    try{
     
        const category = await categoryModel.findOne({slug : req.params.slug}); 
        res.status(200).send({
            success : true ,
            message : 'Get Single Category Successfully' ,
            category
        });
       
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Getting Single Category",
            error: error.message
        });
    }
} ;

export const deleteCategoryController = async(req,res) => {
    try{
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success : true ,
            message : 'Category Deleted Successfully' ,
            category}
        );
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Deleting Category",
            error: error.message
        });
    }
}
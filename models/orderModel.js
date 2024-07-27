import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Product' ,
            
        },
           
    ],
    payment : {
      
    } ,
    buyer :{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
    },
    status : {
        type : String ,
        default : 'Pending' ,
        enum : ['Pending' , 'Processing' , 'Shipped' , 'Delivered' , 'Cancelled'] 
    },

} , {timestamps : true});


export default mongoose.model('Order', orderSchema);
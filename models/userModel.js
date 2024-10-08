import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone : {
        type: Number,
        required: true,
    },
    address : {
        type: {},
        required: true,
    },
    answer : {    
        type: String,
        required: true,
    },
    role : {
        type: Number,
        default: 0 // 0 for admin and 1 for user
    },
    
}, {
    timestamps: true,
});

export default mongoose.model("user", userSchema);
import userModel from '../models/userModel.js';
import User from '../models/userModel.js';
import { hashPassword , comparePassword } from '../utils/authUtil.js';
import JWT from 'jsonwebtoken';

//Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role , answer} = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address|| !answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Register user
        const hashedPwd = await hashPassword(password);

        // Save the new user
        const newUser = await new User({
            name,
            email,
            password: hashedPwd,
            phone,
            address,
            role ,
            answer
        }).save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }
        // Check if password is correct

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password or Username" });
        }

        // Create token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ 
            success: true,
            message : "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role ,
                answer : user.answer
            }
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
   try{
       const {email,Answer,newPassword} = req.body;
       if(!email) {
        res.status(400).send({
          
            message: "Email is required"
        });
       }
       if(!Answer) {
        res.status(400).send({
          
            message: "Answer is required"
        });
       }
       if(!newPassword) {
        res.status(400).send({
          
            message: "New Password is required"
        });
        //check if user exists
        const user = await userModel.findOne({email,Answer});

        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Answer or Email"
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findOneAndUpdate({email}, {password: hashed});
        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        });
       }
   }
   catch(error){
       console.log(error);
       res.status(500).send({
        success: false,
              message: "Something went wrong" ,
              error: error.message
       });
   }
};

//Test Controller
export const testController = async (req, res) => {
    res.send("Protected User");
};
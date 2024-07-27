import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import { hashPassword, comparePassword } from '../utils/authUtil.js';
import JWT from 'jsonwebtoken';

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role, answer } = req.body;

        // Validation
        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Register user
        const hashedPwd = await hashPassword(password);

        // Save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPwd,
            phone,
            address,
            role,
            answer
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
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
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                answer: user.answer
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email || !answer || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email, answer });
        if (!user) {
            return res.status(404).json({ message: "Wrong Answer or Email" });
        }

        const hashed = await hashPassword(newPassword);
        await User.findOneAndUpdate({ email }, { password: hashed });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Test Controller
export const testController = async (req, res) => {
    res.send("Protected User");
};

// Update User Profile Controller
export const updateUserProfileController = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;
        const user = await User.findById(req.user._id);

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hashed = password ? await hashPassword(password) : user.password;

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            phone,
            address,
            password: hashed
        }, { new: true });

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Orders Controller
// Get Orders Controller
export const getOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate('products.product', 'title price images description category subs')
            .populate('buyer', 'name');
        res.json({ orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error fetching user orders", error: error.message });
    }
};


// Get All Orders Controller
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('products.product', 'title price images description category subs')
            .populate('buyer', 'name')
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Error fetching all orders", error: error.message });
    }
};

export const getAllUsersController = async (req, res) => {
    try{
        const users = await User.find({}).select('-password');
        res.json({ users , count: users.length });

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

//delete user
export const deleteUserController = async (req, res) => {
    try{
         const deletedUser = await User.findByIdAndDelete(req.params.id);
         res.status(200).json({ message: "User deleted successfully" });
    }
        catch(error){   
            res.status(500).json({ message: error.message });
        }
    }
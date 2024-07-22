import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Protect Route token-based
export const requireSignin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in requireSignin middleware:', error.message); // Debugging line
        return res.status(401).json({ message: "Unauthorized" });
    }
};

// Admin access middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        if (user.role === 1) { // Assuming role 1 is admin
            next();
        } else {
            return res.status(403).json({ message: "Admin access only" });
        }
    } catch (error) {
        console.error('Error in isAdmin middleware:', error.message); // Debugging line
        return res.status(401).json({ message: "Unauthorized" });
    }
};

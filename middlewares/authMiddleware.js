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
      if (user.role !== 1) {
        return res.send({
          success: true,
          message: "UnAuthorized Access,only admin can add new products",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middleware",
      });
    }
  };
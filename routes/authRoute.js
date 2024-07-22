import express from 'express';
import { registerController , loginController , testController} from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router();

//route

//Register || Method: POST
router.post('/register', registerController);
//Login || Method: POST
router.post('/login', loginController);

//test route , using middleware requireSignin
router.get('/test', requireSignin ,isAdmin , testController);


export default router;
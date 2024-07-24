import express from 'express';
import { registerController , loginController , testController , forgotPasswordController} from '../controllers/authController.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router();

//route

//Register || Method: POST
router.post('/register', registerController);
//Login || Method: POST
router.post('/login', loginController);
//Forgot Password || Method: POST
router.post('/forgot-password', forgotPasswordController);

//test route , using middleware requireSignin
router.get('/test', requireSignin ,isAdmin , testController);

//protected User route
router.get('/user-auth', requireSignin , (req, res) => {
    res.status(200).send( {ok  : true});
});

//protected Admin route
router.get('/admin-auth', requireSignin , isAdmin , (req, res) => {
    res.status(200).send( {ok  : true});
});


export default router;
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoutes.js'
import productRoute from './routes/productRoutes.js';
import cors from 'cors';






//configuring dotenv
dotenv.config();

//database connection
connectDB();
// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('api/v1/product', productRoute);

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Shop.Co</h1>");
});


//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT , () => {
    console.log(`Server is running ${process.env.DEV_MODE} mode on port ${PORT}`);
});
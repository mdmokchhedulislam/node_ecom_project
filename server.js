import express from 'express'

import productRouter from './routes/productRouter.js';
import cors from "cors"
import helmet from 'helmet';
import ratelimit from 'express-rate-limit';
import dotenv from "dotenv"
const app = express();
dotenv.config()
app.use('/product',productRouter)

app.listen(3000, ()=>{
    console.log("server running in port 30000");
    
})
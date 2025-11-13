import express from "express";
import findProduct from "../controller/productController.js";
const router = express.Router();





router.get("/find", findProduct)

export default router
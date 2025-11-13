import express from "express";
const router = express.Router();



router.get("/find", (req,res)=>{
    res.status(201).json({
      success: true,
      message: "find successfully",
    });
    
})

export default router
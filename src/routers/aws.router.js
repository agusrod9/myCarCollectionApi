import { Router } from "express";
import { generateUploadURL } from "../utils/s3.util.js";

const router = Router();


router.get('/',async(req,res)=>{
    try {
        const url = await generateUploadURL();
        if(url){
            res.status(200).json({error : null, data : url})
        }else{
            res.status(404).json({error : "No URL found.", data : null})
        }
    } catch (error) {
        throw error
    }
    
})

export default router
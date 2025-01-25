import { Router } from "express";
import { generateUploadURL } from "../utils/s3.util.js";

const router = Router();


router.get('/',async(req,res)=>{
    try {
        let url = await generateUploadURL();
        if(url){
            url = url.split('?')[0]
            res.status(200).send({error : null, data : url}).json()
        }else{
            res.status(404).send({error : "No URL found.", data : null}).json()
        }
    } catch (error) {
        throw error
    }
    
})


export default router
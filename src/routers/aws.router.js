import { Router } from "express";
import sharp from "sharp";
import multer from "multer";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from 'crypto';

const{AWS_ACCESSKEY_ID, AWS_ACCESS_SECRET_KEY} = process.env;

const router = Router();
const memoryStorage = multer.memoryStorage();
const upload = multer({storage : memoryStorage})

const region = 'us-east-2';
const bucketName = 'user-collected-cars-images-bucket';
const accessKeyId = AWS_ACCESSKEY_ID;
const secretAccessKey = AWS_ACCESS_SECRET_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region
})

router.post('/', upload.single('image'), async(req,res)=>{
    const imageName = crypto.randomBytes(16).toString('hex');
    const newImg = await sharp(req.file.buffer).webp({quality: 80}).toBuffer()
    const putParams = {
        Bucket : bucketName,
        Key : imageName,
        Body : newImg,
        ContentType : 'image/webp',
    }
    const putCommand = new PutObjectCommand(putParams)
    await s3.send(putCommand)

    const getParams = {
        Bucket : bucketName,
        Key : imageName
    }
    const getCommand = new GetObjectCommand(getParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });


    return res.status(200).json({url})
    
});

export default router
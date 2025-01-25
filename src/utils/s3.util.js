import aws from 'aws-sdk';
import crypto from 'crypto';


const{AWS_ACCESSKEY_ID, AWS_ACCESS_SECRET_KEY} = process.env;

const region = 'us-east-2';
const bucketName = 'user-collected-cars-images-bucket';
const accessKeyId = AWS_ACCESSKEY_ID;
const secretAccessKey = AWS_ACCESS_SECRET_KEY;
const signatureVersion = 'v4'

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion
})

export async function generateUploadURL(){
    const imageName = crypto.randomBytes(16).toString('hex');

    const params =({
        Bucket: bucketName,
        Key: imageName,
        Expires : 90
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL;

}
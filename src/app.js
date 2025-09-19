import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import carsRouter from './routers/cars.router.js';
import sessionsRouter from './routers/sessions.router.js';
import carCollectionsRouter from './routers/carCollections.router.js';
import awsRouter from './routers/aws.router.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import pathHandler from './middlewares/pathHandler.mid.js';
import errorHandler from './middlewares/errorHandler.mid.js';

const app = express();
const {PORT, MONGO_REMOTE_URI, SECRET} = process.env;

app.disable('x-powered-by');
app.use(morgan('tiny'));
app.use(cors({
    origin:['http://localhost:5173','https://jovial-medovik-6efedb.netlify.app'],
    credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(SECRET));

app.use('/api/cars', carsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carcollections', carCollectionsRouter);
app.use('/api/aws', awsRouter);


//Handlers
app.use(pathHandler);
app.use(errorHandler);

app.listen(PORT,async()=>{
    console.log("server activo");
    await mongoConnect();
});


async function mongoConnect(){
    try {
        mongoose.connect(MONGO_REMOTE_URI)
        console.log("MONGO DB CONNECTION : SUCCESS");
    } catch (error) {
        process.exit;
    }
}
import express from 'express';
import 'dotenv/config';
import carsRouter from './routers/cars.router.js';
import sessionsRouter from './routers/sessions.router.js';
import mongoose from 'mongoose';

const app = express();
const {PORT, MONGO_REMOTE_URI} = process.env;


app.use(express.json());
app.use('/api/cars', carsRouter);
app.use('/api/sessions', sessionsRouter);



app.listen(PORT,async()=>{
    console.log("server activo");
    await mongoConnect();
});


async function mongoConnect(){
    try {
        mongoose.connect(MONGO_REMOTE_URI)
        console.log("MONGO DB CONNECTION : SUCCESS");
    } catch (error) {
        console.log(error);
        process.exit;
    }
}
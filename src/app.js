import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import 'dotenv/config';
import carsRouter from './routers/cars.router.js';
import sessionsRouter from './routers/sessions.router.js';
import carCollectionsRouter from './routers/carCollections.router.js';
import awsRouter from './routers/aws.router.js';
import filtersRouter from './routers/filters.router.js';
import usersRouter from './routers/users.router.js';
import currenciesRouter from './routers/currencies.router.js';
import globalStatsRouter from './routers/globalStats.router.js';
import contactsRouter from './routers/contacts.router.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import pathHandler from './middlewares/pathHandler.mid.js';
import errorHandler from './middlewares/errorHandler.mid.js';
import { logger } from './utils/logger.util.js';
import { requestLogger } from './middlewares/requestLogger.mid.js';
import { readOnlineUsers } from './services/users.service.js';
import { updateDailyOnlineUsers, updateMonthlyOnlineUsers, updateOnlineUserCount } from './services/globalStats.service.js';


const app = express();

const {PORT, MONGO_REMOTE_URI, SECRET, NODE_ENV} = process.env;

app.disable('x-powered-by');
app.use(cors({
    origin:['http://app.dev.thediecaster.com:5173', 'http://dev.thediecaster.com:5173', 'http://localhost:5173', 'https://app.thediecaster.com', 'https://thediecaster.com', 'https://www.thediecaster.com'],
    credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(requestLogger)
app.use(cookieParser(SECRET));

app.use('/api/aws', awsRouter);
app.use('/api/carcollections', carCollectionsRouter);
app.use('/api/cars', carsRouter);
app.use('/api/filters', filtersRouter)
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter);
app.use('/api/currencies', currenciesRouter);
app.use('/api/globalStats', globalStatsRouter);
app.use('/api/contacts', contactsRouter);

//Handlers
app.use(pathHandler);
app.use(errorHandler);

if(NODE_ENV==='development'){
    const options = {
        key: fs.readFileSync("./certs/dev.thediecaster.com+5-key.pem"),
        cert: fs.readFileSync("./certs/dev.thediecaster.com+5.pem"),
    };
    https.createServer(options, app).listen(PORT, async() => {
        logger.info("ACTIVE SERVER: ⚠️  DEVELOPMENT MODE  ⚠️");
        await mongoConnect();
        updateOnlineUserStats() //interval 1 minute by def
    });

}else if(NODE_ENV==='production'){
    app.listen(PORT,async()=>{
        logger.info("ACTIVE SERVER: ‼️  PRODUCTION MODE  ‼️");
        await mongoConnect();
        updateOnlineUserStats() //interval 1 minute by def
    });
}else{

}




async function mongoConnect(){
    try {
        await mongoose.connect(MONGO_REMOTE_URI);
        logger.info("MONGO DB CONNECTION : SUCCESS");
    } catch (error) {
        logger.error(`MONGO DB CONNECTION: FAILED - ${error.message}`);
        process.exit;
    }
}
async function getOnlineUserStats() {
    try {
        const onlineUsers = await readOnlineUsers();
        const qty = onlineUsers.data.length;
        await updateOnlineUserCount(qty);
        await updateDailyOnlineUsers(onlineUsers.data);
        await updateMonthlyOnlineUsers(onlineUsers.data);
    } catch (error) {
        logger.error(`ERROR UPDATING ONLINE USERS STATS - ${error.message}`)
    }
}

function updateOnlineUserStats(intervalMs=60000){
    getOnlineUserStats()
    setInterval(getOnlineUserStats, intervalMs);
}
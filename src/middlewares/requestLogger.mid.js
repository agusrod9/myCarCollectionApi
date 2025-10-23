import { logger } from "../utils/logger.util.js";
import {randomUUID} from "crypto"


export const requestLogger=(req,res,next)=>{
    const reqId = randomUUID();
    const start = Date.now();

    logger.info(`[${reqId}] ${req.method} ${req.originalUrl} - ${JSON.stringify(req.body)}`);

    res.on("finish", ()=>{
        const duration = Date.now()-start;
        logger.info(`[${reqId}] RES - ${res.statusCode}`)
    });
    next();
};
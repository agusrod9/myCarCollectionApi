import { carCollectionsManager } from "../dao/managers/carCollections.manager.js";

const manager = new carCollectionsManager();

export async function createCarCollection(body){
    try {
        if(!body.collectionName || !body.userId || !body.visibility){
            return{
                statusCode: 400,
                error: "MISSING MANDATORY FIELDS",
                data: [],
            }
        }
        const  data = body;
        const process = await manager.createCollection(data);
        if(process){
            return {
                statusCode : 201,
                error: null,
                data : process
            }
        }else{
            return {
                statusCode : 500,
                error : "COLLECTION NOT ADDED",
                data : []
            }
        }
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
    
}
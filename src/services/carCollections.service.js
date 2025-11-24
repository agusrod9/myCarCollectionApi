import { carCollectionsManager } from "../dao/managers/carCollections.manager.js";
import * as carsService from '../services/cars.service.js'

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

export async function readCarCollections(userId, cid){
    try {
        if(cid){
            const collection = await manager.getCollectionById(cid);
            if(collection){
                return {
                    statusCode : 200,
                    error: null,
                    data : collection
                }
            }else{
                return {
                    statusCode : 404,
                    error: "COLLECTION NOT FOUND",
                    data: null
                }
            }
        }
        let collections = []
        if(userId){
            collections = await manager.getCollectionsByUserId(userId);
        }else{
            collections = await manager.getAllCollections();
        }
        
        if(collections.length>0){
            return {
                statusCode : 200,
                error: null,
                data : collections
            }
        }else{
            return {
                statusCode : 404,
                error: "NO COLLECTIONS FOUND",
                data: null
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

export async function updateCarCollection(cid, newData){
    try {
        const collection = await manager.getCollectionById(cid);
        if(collection){
            Object.entries(newData).forEach(([key, value])=>{
                collection[key] = newData[key]
            })
            const process = await manager.updateCollectionById(cid, collection);
            if (process){
                return {
                    statusCode : 200,
                    error: null,
                    data: process
                }
            } else {
                return {
                    statusCode : 500,
                    error: "COLLECTION NOT UPDATED",
                    data: []
                }
            }
        }else{
            return {
                statusCode : 404,
                error: 'COLLECTION DOES NOT EXIST',
                data : null
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

export async function deleteCarCollection(cid){
    try {
        const collection = await manager.getCollectionById(cid);
        if(collection){
            const process = await manager.deleteCollectionById(cid);
            if(process){
                //
                const carsInCollection = await carsService.readCarsByCollectionId(cid);
                if(carsInCollection.data.length>0){
                    for(let car of carsInCollection.data){
                        await carsService.updateCar(car._id,{collectionId : null});
                    }
                }
                return {
                    statusCode : 200,
                    error: null,
                    data : process
                }
            }else{
                return {
                    statusCode : 500,
                    error: 'COULDNT DELETE COLLECTION',
                    data : null
                }
            }
        }else{
            return {
                statusCode : 404,
                error: 'COLLECTION DOES N0T EXIST',
                data : null
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
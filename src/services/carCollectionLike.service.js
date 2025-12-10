import { carCollectionLikesManager } from "../dao/managers/carCollectionLikes.manager.js";
import * as carCollectionsService from './carCollections.service.js';
import * as usersService from './users.service.js';

const manager = new carCollectionLikesManager();

export async function createCarCollectionLike(body){
    try {
        const {userId, collectionId} = body;
        if(!userId || !collectionId){
            return{
                statusCode : 400,
                error : "MISSING MANDATORY DATA",
                data : []
            }
        }
        const userResponse = await usersService.readUsers(userId);
        if(userResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "USER NOT FOUND",
                data : []
            }
        }
        const collectionResponse = await carCollectionsService.readCarCollections( userId, collectionId);
        if(collectionResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "COLLECTION NOT FOUND",
                data : []
            }
        }
        const process = await manager.createCarCollectionLike({userId, collectionId})
        if(process){
            return{
                statusCode : 201,
                error : null,
                data : process
            }
        }else{
            return{
                statusCode : 500,
                error : "ERROR CREATING COLLECTION LIKE",
                data : []
            }
        }
    } catch (error) {
        if(error.code===11000){
            return{
                statusCode : 409,
                error : "LIKE ALREADY EXISTS",
                data : []
            }
        }
        throw error;
    }
}

export async function readCarCollectionLikesByCarCollectionId(collectionId){
    try {
        if(!collectionId){
            return{
                statusCode : 400,
                error : "MISSING MANDATORY DATA",
                data : []
            }
        }
        const collectionResponse = await carCollectionsService.readCarCollections(null, collectionId);
        if(collectionResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "COLLECTION NOT FOUND",
                data : []
            }
        }
        const likesProcess = await manager.readCarCollectionLikesByCollectionId(collectionId);
        const likesCountProcess = await manager.readCarCollectionLikesCountByCollection(collectionId);
        if(likesProcess && likesCountProcess){
            return{
                statusCode : 200,
                error : null,
                data : {likesCount : likesCountProcess, likes : likesProcess}
            }
        }
        return{
            statusCode : 500,
            error : "ERROR READING COLLECTION LIKES",
            data : []
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteCarCollectionLike(body){
    try {
        const {userId, collectionId} = body;
        if(!userId || !collectionId){
            return{
                statusCode : 400,
                error : "MISSING MANDATORY DATA",
                data : []
            }
        }
        const userResponse = await usersService.readUsers(userId);
        if(userResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "USER NOT FOUND",
                data : []
            }
        }
        const collectionResponse = await carCollectionsService.readCarCollections(userId, collectionId);
        if(collectionResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "COLLECTION NOT FOUND",
                data : []
            }
        }
        const process = await manager.deleteCarCollectionLike(userId, collectionId);
        if(process){
            return{
                statusCode : 200,
                error : null,
                data : process
            }
        }

        return{
            statusCode : 500,
            error : "ERROR DELETING LIKE",
            data : []
        }

    } catch (error) {
        throw error;
    }
}
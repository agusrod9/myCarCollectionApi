import { carLikesManager } from "../dao/managers/carLikes.manager.js";
import * as carsService from './cars.service.js';
import * as usersService from './users.service.js';

const manager = new carLikesManager();

export async function createCarLike(body){
    try {
        const {userId, carId} = body;
        if(!userId || !carId){
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
        const carResponse = await carsService.readCars({id: carId});
        if(carResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "CAR NOT FOUND",
                data : []
            }
        }
        const process = await manager.createCarLike({userId, carId})
        if(process){
            return{
                statusCode : 201,
                error : null,
                data : process
            }
        }else{
            return{
                statusCode : 500,
                error : "ERROR CREATING CAR LIKE",
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

export async function readCarLikesByCarId(carId){
    try {
        if(!carId){
            return{
                statusCode : 400,
                error : "MISSING MANDATORY DATA",
                data : []
            }
        }
        const carResponse = await carsService.readCars({id: carId});
        if(carResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "CAR NOT FOUND",
                data : []
            }
        }
        const likesProcess = await manager.readCarLikesByCarId(carId);
        const likesCountProcess = await manager.readCarLikesCountByCar(carId);
        if(likesProcess && likesCountProcess){
            return{
                statusCode : 200,
                error : null,
                data : {likesCount : likesCountProcess, likes : likesProcess}
            }
        }
        return{
            statusCode : 500,
            error : "ERROR READING CAR LIKES",
            data : []
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteCarLike(body){
    try {
        const {userId, carId} = body;
        if(!userId || !carId){
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
        const carResponse = await carsService.readCars({id: carId});
        if(carResponse.statusCode!==200){
            return{
                statusCode : 404,
                error : "CAR NOT FOUND",
                data : []
            }
        }
        const process = await manager.deleteCarLike(userId, carId);
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
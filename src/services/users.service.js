import { usersManager } from "../dao/managers/usersManager.js";

const manager = new usersManager();

export async function readUsers(id){
    try {
        let usr = null;
        if(id){
            usr = await manager.readById(id);
        }else{
            usr = await manager.readAllUsers();
        }
        if(usr){
            return {
                statusCode : 200,
                error : null,
                data : usr
            }
        }else{
            return {
                statusCode : 404,
                error : "NO USER FOUND",
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

export async function checkUserNick(nick){
    try {
        if(!nick){
            return {
                statusCode : 400,
                error: "MISSING MANDATORY FIELDS",
                data: null
            }
        }
        const available = await manager.checkNickAvailability(nick);
        return {
            statusCode : 200,
            error : null,
            data : available
        }
    } catch (error) {
        
    }
}

export async function updateUser(id, newData){
    try {
        if(!id || !newData || Object.keys(newData).length === 0){
            return {
                statusCode : 400,
                error: "MISSING MANDATORY FIELDS",
                data: null
            }
        }
        
        const usr = await manager.readById(id);
        if(usr){
            Object.entries(newData).forEach(([key, value])=>{
                usr[key] = newData[key];
            })
            const process = await manager.updateUser(id,usr);
            if(process){
                return {
                    statusCode : 200,
                    error: null,
                    data: process
                }
            }else{
                return {
                    statusCode : 500,
                    error: "USER NOT UPDATED",
                    data: null 
                }
            }
        }
        return {
            statusCode : 404,
            error: "USER NOT FOUND",
            data: null

        }
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function userStatsOnNewCar(car, action){
    try {
        const usr = await manager.readById(car.userId);
        let updateData = {}
        if(action==="increment"){
            updateData = { "stats.totalCars" : usr.stats.totalCars+1};
        }else if(action==="decrease"){
            updateData = { "stats.totalCars" : usr.stats.totalCars-1};
        }else{
            throw new Error("UNSUPPORTED METHOD")
        }
        if (!usr.settings.mainCurrency && car.price){
            updateData["settings.mainCurrency"] = car.price.currency
        }
        const process = await manager.updateUser(car.userId, updateData);
        return process
    } catch (error) {
        throw error;
    }
}

export async function updateUserLanguage(id,language){
    try {
        if(!language){
            return{
                statusCode : 400,
                error : "MISSING MANDATORY FIELDS",
                data : []
            }
        }
        const process = await manager.updateUserLanguage(id, language);
        if(process){
            return{
                statusCode : 200,
                error: null,
                data : process
            }
        }else{
            return{
                statusCode : 404,
                error: "USER NOT FOUND",
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
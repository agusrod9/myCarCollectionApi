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
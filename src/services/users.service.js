import { usersManager } from "../dao/managers/usersManager.js";
import { carManager } from "../dao/managers/cars.manager.js";

const usrManager = new usersManager();
const carsManager = new carManager()

export async function readUsers(id){
    try {
        let usr = null;
        if(id){
            usr = await usrManager.readById(id);
        }else{
            usr = await usrManager.readAllUsers();
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
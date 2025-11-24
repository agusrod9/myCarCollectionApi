import * as usersService from '../services/users.service.js';
import * as carsService from '../services/cars.service.js'

export async function readUsers(req,res){
    try {
        const {id} = req.query;
        const result = await usersService.readUsers(id);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function readUserCarsValue(req,res){
    try {
        const{userId} = req.params;
        const result = await carsService.readUserCarsAmountByCurrency(userId);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

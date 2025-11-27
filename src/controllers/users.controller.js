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

export async function checkUserNick(req,res){
    try {
        const {nick} = req.query;
        const result = await usersService.checkUserNick(nick);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function updateUser(req,res){
    try {
        const {id} = req.params;
        const{_id, ...newData} = req.body;
        const result = await usersService.updateUser(id, newData);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function updateUserLanguage(req,res){
    try {
        const {id} = req.params;
        const {language} = req.body;
        const result = await usersService.updateUserLanguage(id, language)
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function userPing(req,res){
    try {
        const {userId} = req.user;
        const result = await usersService.userPing(userId)
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function readOnlineUsers(req,res){
    try {
        const result = await usersService.readOnlineUsers();
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function readOnlineUsersCount(req,res){
    try {
        const result = await usersService.readOnlineUsers();
        return res.status(result.statusCode).json({error : result.error, data : result.data.length});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}
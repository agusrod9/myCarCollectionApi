import * as usersService from '../services/users.service.js';

export async function readCollectorByUserName(req, res){
    try {
        const {userName} = req.params;
        const result = await usersService.readCollector(userName)
        return res.status(result.statusCode).json({error: result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}
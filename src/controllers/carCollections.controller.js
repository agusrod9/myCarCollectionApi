import * as carCollectionsService from '../services/carCollections.service.js'

export async function createCarCollection(req, res){
    try {
        const result = await carCollectionsService.createCarCollection(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data: []});
    }
}

export async function readCarCollections(req,res){
    try {
        const {userId, cid} = req.query;
        const result = await carCollectionsService.readCarCollections(userId, cid);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}
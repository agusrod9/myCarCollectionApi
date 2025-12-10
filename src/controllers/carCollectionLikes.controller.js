import * as carCollectionLikesService from '../services/carCollectionLike.service.js';

export async function createCarCollectionLike(req, res, next){
    try {
        const result = await carCollectionLikesService.createCarCollectionLike(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error);
    }
}

export async function readCarCollectionLikesByCarCollectionId(req, res, next){
    try {
        const {collectionId} = req.params;
        const result = await carCollectionLikesService.readCarCollectionLikesByCarCollectionId(collectionId)
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error);
    }
}

export async function deleteCarCollectionLike(req, res, next){
    try {
        const result = await carCollectionLikesService.deleteCarCollectionLike(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error)
    }
}
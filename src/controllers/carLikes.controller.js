import * as carLikesService from '../services/carLikes.service.js';

export async function createCarLike(req, res, next){
    try {
        const result = await carLikesService.createCarLike(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error);
    }
}

export async function readCarLikesByCarId(req, res, next){
    try {
        const {carId} = req.params;
        const result = await carLikesService.readCarLikesByCarId(carId)
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error);
    }
}

export async function deleteCarLike(req, res, next){
    try {
        const result = await carLikesService.deleteCarLike(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data});
    } catch (error) {
        next(error)
    }
}
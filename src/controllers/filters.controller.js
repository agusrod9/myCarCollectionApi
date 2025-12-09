import * as filtersService from '../services/filters.service.js'

export async function readUserAvailableFilters(req, res, next){
    try {
        const {userId, favorites} = req.query;
        if(!userId){
            return res.status(400).json({error:'BAD REQUEST'});
        }
        const isFavorite = favorites === 'true';
        const result = await filtersService.readUserAvailableFilters(userId, isFavorite);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        next(error);
    }
}
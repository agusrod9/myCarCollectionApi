import * as statsService from '../services/globalStats.service.js';

export async function readAllStats(req,res){
    try {
        const {updateCounters} = req.query;
        const result = await statsService.readAllStats(updateCounters);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error : error.message, data : []})
    }
}

export async function updateStats(req,res){
    try {
        const {_id, ...newData} = req.body;
        const result = await statsService.updateStats(newData);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error : error.message, data : []})
    }
}

export async function updateLanguageStats(req,res){
    try {
        const {language} =req.body;
        const result = await statsService.updateLanguageStats(language);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error : error.message, data : []})
    }
}

export async function updateCountriesStats(req,res){
    try {
        const {country} =req.body;
        const result = await statsService.updateCountriesStats(country);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error : error.message, data : []})
    }
}
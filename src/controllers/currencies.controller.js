import * as currenciesService from '../services/currencies.service.js'

export async function createCurrency(req,res){
    try {
        const result = await currenciesService.createCurrency(req.body);
        return res.status(result.statusCode).json({error: result.error, data: result.data})
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function readCurrencies(req,res){
    try {
        const {id, code} = req.query;
        const params = {id, code}
        const result = await currenciesService.readCurrencies(params);
        return res.status(result.statusCode).json({error: result.error, data: result.data})
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function updateCurrency(req,res){
    try {
        const {id} = req.params;
        const {_id, ...newData} = req.body;
        const result = await currenciesService.updateCurrency(id,newData);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function deleteCurrency(req,res){
    try {
        const {id} = req.params;
        const result = await currenciesService.deleteCurrency(id);
        return res.status(result.statusCode).json({error : result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}
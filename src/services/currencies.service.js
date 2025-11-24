import { currenciesManager } from "../dao/managers/currencies.manager.js";

const manager = new currenciesManager();

export async function createCurrency(body){
    try {
        if(!body.name || !body.symbol || !body.country || !body.flag || !body.code){
            return {
                statusCode : 400,
                error : "MISSING MANDATORY FIELDS",
                data : [] 
            }
        }
        const newCurrency = body;
        const process = await manager.createCurrency(newCurrency);
        if(process){
            return{
                statusCode : 201,
                error : null,
                data : process
            }
        }else{
            return {
                statusCode : 500,
                error : "CURRENCY NOT ADDED",
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

export async function readCurrencies(params){
    try {
        const {id, code} = params;
        if(id){
            const currency = await manager.readCurrencyById(id);
            if(currency){
                return{
                    statusCode : 200,
                    error : null,
                    data : currency
                }
            }
            return {
                statusCode : 400,
                error : "NO CURRENCY FOUND",
                data : []
            }
        }else{
            if(code){
                const currency = await manager.readCurrencyByCode(code);
                if(currency){
                    return {
                        statusCode : 200,
                        error : null,
                        data : currency
                    }
                }else{
                    return {
                        statusCode : 400,
                        error: "NO CURRENCY FOUND",
                        data: []
                    }
                }
            }else{
                const currencies = await manager.readAllCurrencies();
                if(currencies?.length>0){
                    return {
                        statusCode : 200,
                        error : null,
                        data : currencies
                    }
                }else{
                    return {
                        statusCode : 400,
                        error : "NO CURRENCY FOUND",
                        data : []
                    }
                }
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

export async function updateCurrency(id, newData){
    try {
        if(!id || !newData){
            return {
                statusCode : 400,
                error : "MISSING MANDATORY FIELDS",
                data : []
            }
        }
        const process = await manager.updateCurrency(id, newData);
        if(process){
            return {
                statusCode : 200,
                error : null,
                data : process
            }
        }
        return {
            statusCode : 500,
            error : "CURRENCY NOT UPDATED",
            data : []
        }
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function deleteCurrency(id){
    try {
        if(!id){
            return {
                statusCode : 400,
                error : "MISSING MANDATORY FIELDS",
                data : []
            }
        }
        const process = await manager.deleteById(id);
        if(process){
            return{
                statusCode : 200,
                error : null,
                data : process
            }
        }else{
            return{
                statusCode : 500,
                error : "CURRENCY NOT DELETED",
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
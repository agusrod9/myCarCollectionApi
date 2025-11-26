import { globalStatsManager } from "../dao/managers/globalStats.manager.js";

const manager = new globalStatsManager()

export async function readAllStats(updateCounters){
    try {    
        let stats;
        if(updateCounters){
            stats = await manager.getStatsAndUpdateCounters();
        }
        stats = await manager.getStats();
        return {
            statusCode : 200,
            error : null,
            data : stats
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function updateStats(newData){
    try {
        if (!newData || Object.keys(newData).length === 0) {
            return{
                statusCode : 400,
                error : "MISSING NEW DATA",
                data : []
            }
        }
        const currentStats = manager.getStats();
        Object.entries(newData).forEach(([key, value]) => {
            currentStats[key] = newData[key];
        });
        const process = await manager.updateStats(currentStats);
        if(process){
            return{
                statusCode : 200,
                error : null,
                data : process
            }
        }else{
            return{
                statusCode : 500,
                error : "STATS NOT UPDATED",
                data : []
            }
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function updateLanguageStats(language){
    try {
        if (!language) {
            return{
                statusCode : 400,
                error : "MISSING LANGUAGE",
                data : []
            }
        }
        const filter = {
            _id: "GLOBAL_STATS",
            uniqueLanguages : {$ne: language}
        }
        const update = {
            $addToSet : {uniqueLanguages : language},
            $inc : {totalLanguages : 1}
        }
        const opt = {new: true, runValidators: true};
        const updated = await manager.updateLanguagesStats(filter, update, opt);
        return {
            statusCode : 200,
            error : null,
            data: updated
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function updateCountriesStats(country){
    try {
        if (!country) {
            return{
                statusCode : 400,
                error : "MISSING COUNTRY",
                data : []
            }
        }
        const filter = {
            _id: "GLOBAL_STATS",
            uniqueCountries : {$ne: country}
        }
        const update = {
            $addToSet : {uniqueCountries : country},
            $inc : {totalCountries : 1}
        }
        const opt = {new: true, runValidators: true};
        const updated = await manager.updateCountriesStats(filter, update, opt);
        return {
            statusCode : 200,
            error : null,
            data: updated
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function incrementTotalCars(){
    try {
        const updated = await manager.incrementTotalCars()
        return {
            statusCode : 200,
            error : null,
            data: updated
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function incrementTotalCollections(){
    try {
        const updated = await manager.incrementTotalCollections()
        return {
            statusCode : 200,
            error : null,
            data: updated
        }
    } catch (error) {
        return{
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}
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

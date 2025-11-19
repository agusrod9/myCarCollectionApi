import { logger } from '../../utils/logger.util.js';
import globalStatsModel from '../models/globalStats.model.js';

export class globalStatsManager{
    constructor(){
        this.model = globalStatsModel;
        this.ensureSingleton();
    }

    async ensureSingleton(){
        const prevInstance = await this.model.findById("GLOBAL_STATS");
        if(!prevInstance){
            try {
                await this.model.create({_id: "GLOBAL_STATS"})
                logger.info("GLOBAL_STATS SINGLE INSTANCE CREATED IN DB")
            } catch (error) {
                logger.error("ERROR CREATING SINGLE INSTANCE OF GLOBAL_STATS IN DB")
            }
        }
    }

    async getStats() {
        return this.model.findById("GLOBAL_STATS");
    }

    async getStatsAndUpdateCounters() {
        return this.model.findByIdAndUpdate("GLOBAL_STATS",{
            $inc:{totalUsers: 1, totalActiveUsers: 1, newUsersThisMonth: 1},
            $set:{lastUpdated: Date.now()}
        },{new:true});
    }

}
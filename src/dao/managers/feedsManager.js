import feedsModel from '../models/feeds.model.js'

export class feedsManager{
    constructor(){
        this.model = feedsModel;
    }

    async readFeedByUserId(id){
        try {
            let userFeed = await this.model.find({userId : id});
            return userFeed;
        } catch (error) {
            throw error;
        }
    }
}
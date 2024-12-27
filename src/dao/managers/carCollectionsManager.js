import carCollectionsModel from '../models/carCollections.model.js'

export class carCollectionsManager{
    constructor(){
        this.model = carCollectionsModel;
    }

    async createCollection(data){
        try {
            let newCollection = await this.model.create(data);
            return newCollection;
        } catch (error) {
            throw error;
        }

    }
}
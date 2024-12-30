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

    async updateCarList(carList, collectionId){
        try {
            let opts = {new : true};
            let process = this.model.findOneAndUpdate({_id : collectionId}, {cars:carList}, opts);
            return process;
        } catch (error) {
            throw error;
        }
    }

    async getCollection(id){
        try {
            let collection = this.model.find({_id:id}).lean();
            return collection;
        } catch (error) {
            throw error;
        }
    }
}
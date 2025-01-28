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

    async getCollectionById(id){
        try {
            let collection = this.model.find({_id:id}).lean();
            return collection;
        } catch (error) {
            throw error;
        }
    }

    async getAllCollections(){
        try {
            let collections = this.model.find().lean();
            return collections;
        } catch (error) {
            throw error;
        }
    }

    async getCollectionsByUserId(userId){
        try {
            let collections = this.model.find({userId}).lean();
            return collections;
        } catch (error) {
            throw error
        }
    }

    async deleteCollectionById(collectionId){
        try {
            let deleted = this.model.findByIdAndDelete(collectionId);
            return deleted;
        } catch (error) {
            throw error;
        }
    }
}
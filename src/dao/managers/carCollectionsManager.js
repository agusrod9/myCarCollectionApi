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

    async getCollectionById(id){
        try {
            const one = this.model.findOne({_id:id}).lean();
            return one;
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

    async updateCollectionById(id, data){
        try {
            const opt = {new: true};
            const one = this.model.findByIdAndUpdate(id,data,opt);
            return one;
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
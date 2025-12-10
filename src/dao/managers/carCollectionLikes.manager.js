import carCollectionLikesModel from '../models/carCollectionLikes.model.js';

export class carCollectionLikesManager{
    constructor(){
        this.model = carCollectionLikesModel;
    }

    async createCarCollectionLike(data){
        try {
            const newLike = await this.model.create(data);
            return newLike;
        } catch (error) {
            throw error;
        }
    }

    async readCarCollectionLikesByCollectionId(collectionId){
        try {
            const collectionLikes = await this.model.find({collectionId});
            return collectionLikes;
        } catch (error) {
            throw error;
        }
    }

    async readCarCollectionLikesCountByCollection(collectionId){
        try {
            const likesCount = await this.model.countDocuments({collectionId});
            return likesCount;
        } catch (error) {
            throw error;
        }
    }

    async readCarCollectionLikesByUser(userId){
        try {
            const collectionLikes = await this.model.find({userId});
            return collectionLikes;
        } catch (error) {
            throw error;
        }
    }

    async deleteCarCollectionLike(userId, collectionId){
        try {
            const removedLike = await this.model.findOneAndDelete({userId, collectionId});
            return removedLike;
        } catch (error) {
            throw error;
        }
    }


}
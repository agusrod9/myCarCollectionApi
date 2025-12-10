import carLikesModel from '../models/carLikes.model.js';

export class carLikesManager{
    constructor(){
        this.model = carLikesModel;
    }

    async createCarLike(data){
        try {
            const newLike = await this.model.create(data);
            return newLike;
        } catch (error) {
            throw error;
        }
    }

    async readCarLikesByCarId(carId){
        try {
            const carLikes = await this.model.find({carId});
            return carLikes;
        } catch (error) {
            throw error;
        }
    }

    async readCarLikesCountByCar(carId){
        try {
            const likesCount = await this.model.countDocuments({carId});
            return likesCount;
        } catch (error) {
            throw error;
        }
    }

    async readCarLikesByUser(userId){
        try {
            const carLikes = await this.model.find({userId});
            return carLikes;
        } catch (error) {
            throw error;
        }
    }

    async deleteCarLike(userId, carId){
        try {
            const removedLike = await this.model.findOneAndDelete({userId, carId});
            return removedLike;
        } catch (error) {
            throw error;
        }
    }


}
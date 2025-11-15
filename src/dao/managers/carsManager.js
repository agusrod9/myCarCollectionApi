import mongoose from 'mongoose';
import carsModel from '../models/cars.model.js';

export class carManager{
    constructor(){
        this.model = carsModel;
    }

    async readAllCars(){
        try {
            const cars = await this.model.find();
            return cars;
        } catch (error) {
            throw error;
        }
    }

    async readUserCarCount(userId){
        try {
            const carsCount = await this.model.countDocuments({userId})
            return carsCount
        } catch (error) {
            throw error;
        }
    }

    async readUserCarsTotalAmount(userId){
        const matchUserId = new mongoose.Types.ObjectId(userId)
        try {
            const totals = await this.model.aggregate([
                {$match : {userId: matchUserId}},
                {$group: {
                    _id: "$price.currency", 
                    totalAmount: {$sum: '$price.amount'}
                }},
                {$lookup: {
                    from: "currencies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "currencyData"
                }},
                {$unwind: "$currencyData"},
                {$project:{
                    _id:0,
                    totalAmount: 1,
                    currencyId: "$_id",
                    currencyCode: "$currencyData.code",
                    currencyName: "$currencyData.name",
                    currencySymbol: "$currencyData.symbol",
                    currencyFlag: "$currencyData.flag",
                    currencyCountry: "$currencyData.country"
                }}
            ]);
            return totals
        } catch (error) {
            throw error;
        }
    }

    async readUserRecentlyAddedCars(userId){
        try {
            const recentlyAddedCars = await this.model.find({userId}).sort({dateAdded: -1}).limit(3);
            return recentlyAddedCars;
        } catch (error) {
            throw error;
        }
    }

    async readUserAvailableFilters(userId){
        try {
            let availableFilters = {};
            availableFilters.availableManufacturers = await this.model.distinct("manufacturer", userId);
            availableFilters.availableCarMakes = await this.model.distinct("carMake", userId);
            availableFilters.availableScales = await this.model.distinct("scale", userId);
            availableFilters.availablePrices = await this.model.distinct("price", userId);
            return availableFilters;
        } catch (error) {
            throw error
        }
    }

    async readCarById(id){
        try {
            const one = await this.model.findOne({_id:id}).lean();
            return one;
        } catch (error) {
            throw error;
        }
    }

    async readCarsByModel(model){
        try {
            const cars = await this.model.find({carModel: {$regex: '.*' + model + '.*', $options : 'i'}})
            return cars;
        } catch (error) {
            throw error;
        }
    }

    async readCarsByMake(make){
        try {
            const cars = await this.model.find({carMake: {$regex: '.*' + make + '.*', $options : 'i'}})
            return cars;
        } catch (error) {
            throw error;
        }
    }

    async readCarsByMakeAndModel(make, model){
        try {
            const cars = await this.model.find({carMake: {$regex: '.*' + make + '.*', $options : 'i'}, carModel : {$regex: '.*' + model + '.*', $options : 'i'}})
            return cars;
        } catch (error) {
            throw error;
        }
    }

    async readCarsByFilters(filters){
        try {
            const cars = await this.model.find(filters).lean();
            return cars;
        } catch (error) {
            throw error;
        }
    }

    async createNewCar(newCar){
        try {
            const one = await this.model.create(newCar);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async updateCar(id, data){
        try {
            const opt = {new: true};
            const one = await this.model.findByIdAndUpdate(id, data, opt);
            return one;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id){
        try {
            const one = await this.model.findByIdAndDelete(id);
            return one;
        } catch (error) {
            throw error;
        }
    }

}
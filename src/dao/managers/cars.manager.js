import mongoose from 'mongoose';
import carsModel from '../models/cars.model.js';

export class carManager{
    constructor(){
        this.model = carsModel;
    }

    async createNewCar(newCar){
        try {
            const one = await this.model.create(newCar);
            return one;
        } catch (error) {
            throw error;
        }
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

    async readCarWithCurrencyInfo(carId){
        try {
            const one = await this.model.findById(carId);
            if(!one){
                return null;
            }

            const result = await this.model.aggregate([
                {$match: {_id: one._id}},
                {
                    $lookup:{
                    from: "currencies",
                    localField: "price.currency",
                    foreignField: "_id",
                    as: "currencyInfo"
                    }
                },
                {$unwind: "$currencyInfo"},
                {
                    $project: {
                    carYear:1,
                    manufacturer: 1,
                    scale: 1,
                    notes: 1,
                    opened: 1,
                    series: 1,
                    series_num: 1,
                    collectionId: 1,
                    carMake: 1,
                    carModel: 1,
                    carColor: 1,
                    img_urls: 1,
                    userId: 1,
                    price: 1,
                    dateAdded: 1,
                    currencyInfo: {
                        id: "$currencyInfo._id",
                        code: "$currencyInfo.code",
                        name: "$currencyInfo.name",
                        symbol: "$currencyInfo.symbol",
                        flag: "$currencyInfo.flag",
                        country: "$currencyInfo.country"
                    }
                    }
                }
            ])
            return result[0]
        } catch (error) {
            throw error;
        }
    }

    async updateCar(id, data){
        try {
            const opt = {new: true, runValidators: true};
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
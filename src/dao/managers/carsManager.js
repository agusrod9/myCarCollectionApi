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
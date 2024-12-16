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
            const cars = await this.model.find({model: {$regex: '.*' + model + '.*', $options : 'i'}})
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

}
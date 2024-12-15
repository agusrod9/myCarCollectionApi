import carsModel from '../models/cars.model.js';

export class carManager{
    constructor(){
        this.model = carsModel;
    }

    async readAllCars(){
        const cars = await this.model.find();
        return cars;
    }


}
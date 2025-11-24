import currenciesModel from '../models/currencies.model.js';

export class currenciesManager{
    constructor(){
        this.model = currenciesModel;
    }

    async createCurrency(data){
        try {
            const newCurrency = await this.model.create(data);
            return newCurrency;
        } catch (error) {
            throw error;
        }
    }

    async readAllCurrencies(){
        try {
            const currencies = await this.model.find().lean();
            return currencies;
        } catch (error) {
            throw error;
        }
    }

    async readCurrencyById(id){
        try {
            const currency = await this.model.findOne({_id: id}).lean();
            return currency;
        } catch (error) {
            throw error;
        }
    }

    async readCurrencyByCode(code){
        try {
            const currency = await this.model.findOne({code}).lean();
            return currency
        } catch (error) {
            throw error;
        }
    }

    async updateCurrency(id, data){
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
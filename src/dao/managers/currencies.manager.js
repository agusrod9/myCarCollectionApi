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
}
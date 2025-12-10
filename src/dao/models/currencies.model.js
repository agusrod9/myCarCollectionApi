import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'currencies';

const schema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    country : {type: String, required: true},
    exchangeRateUsd : {type: Number, default: 1},
    flag: {type: String, required: true},
    name : {type: String, required: true},
    symbol : {type: String, required: true},
});

const model = new mongoose.model(collection, schema);
export default model;

import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'currencies';

const schema = new mongoose.Schema({
    name : {type: String, required: true},
    symbol : {type: String, required: true},
    country : {type: String, required: true},
    flag: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    exchangeRateUsd : {type: Number, default: 1}
});

const model = new mongoose.model(collection, schema);
export default model;

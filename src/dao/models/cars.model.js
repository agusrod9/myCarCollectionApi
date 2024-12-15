import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'cars';

const schema = new mongoose.Schema({
    model : {type : String, required : true },
    img_url : {type : String, required : true },
    series : {type : String, required : true },
    series_num : {type : Number, required : true },
    user : {type : String, required : true },
    year : {type : Number, required : true }
});

const model = new mongoose.model(collection,schema);

export default model;

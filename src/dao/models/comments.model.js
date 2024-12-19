import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'comments';

const schema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    content : {type : String, required : true},
    likedBy : [{type: mongoose.Schema.Types.ObjectId, ref : 'users', default : []}]
});

const model = mongoose.model(collection, schema);

export default model;
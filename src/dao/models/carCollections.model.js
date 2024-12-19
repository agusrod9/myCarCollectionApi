import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'carCollections';

const schema = new mongoose.Schema({
    collectionName: {type : String, required : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    cars : [{type : mongoose.Schema.Types.ObjectId, ref : 'cars', default : []}],
    visibility : {type : String, enum : ['private', 'public', 'friendsOnly'], required : true}
});

const model = new mongoose.model(collection, schema);

export default model;
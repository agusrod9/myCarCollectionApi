import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'carCollections';

const schema = new mongoose.Schema({
    collectionName: {type : String, required : true},
    description : {type: String, default: ""},
    coverImg : {type: String, default : ""},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    visibility : {type : String, enum : ['private', 'public', 'friendsOnly'], required : true},
    dateAdded : {type: Date, default: Date.now, immutable : true}
});

const model = new mongoose.model(collection, schema);

export default model;
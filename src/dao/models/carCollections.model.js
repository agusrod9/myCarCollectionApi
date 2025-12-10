import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'carCollections';

const schema = new mongoose.Schema({
    carCount : {type: Number, default: 0},
    collectionName: {type : String, required : true},
    coverImg : {type: String, default : null},
    dateAdded : {type: Date, default: Date.now, immutable : true},
    description : {type: String, default: null},
    lastUpdated : {type: Date, default: Date.now},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    viewsCount: {type: Number, default: 0},
    visibility : {type : String, enum : ['public', 'friendsOnly', 'private'], required : true},
});

const setLastUpdated = function(next) {
    this.set({ lastUpdated: new Date() });
    next();
};

schema.pre('findOneAndUpdate', setLastUpdated);
schema.pre('findByIdAndUpdate', setLastUpdated);
schema.pre('updateOne', setLastUpdated);

const model = new mongoose.model(collection, schema);

export default model;
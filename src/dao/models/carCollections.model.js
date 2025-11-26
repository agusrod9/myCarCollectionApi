import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'carCollections';

const schema = new mongoose.Schema({
    collectionName: {type : String, required : true},
    description : {type: String, default: ""},
    coverImg : {type: String, default : ""},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    visibility : {type : String, enum : ['public', 'friendsOnly', 'private'], required : true},
    dateAdded : {type: Date, default: Date.now, immutable : true},
    lastUpdated : {type: Date, default: Date.now},
    carCount : {type: Number, default: 0},
    likedBy : [{type: mongoose.Schema.Types.ObjectId, ref : 'users', default : []}],
    likesCount: {type: Number, default: 0},
    viewsCount: {type: Number, default: 0},
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
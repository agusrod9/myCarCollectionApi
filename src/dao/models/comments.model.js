import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'comments';

const schema = new mongoose.Schema({
    carId : {type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true},
    content : {type : String, required : true},
    createdAt : {type: Date, default : Date.now, immutable : true},
    isDeleted: {type: Boolean, default: false},
    isEdited: {type: Boolean, default: false},
    parentCommentId : {type: mongoose.Schema.Types.ObjectId, ref: 'comments', default: null},
    repliesCount : {type: Number, default: 0},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
});

const model = mongoose.model(collection, schema);

export default model;
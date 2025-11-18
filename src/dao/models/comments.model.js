import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'comments';

const schema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    carId : {type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true},
    content : {type : String, required : true},
    likedBy : [{type: mongoose.Schema.Types.ObjectId, ref : 'users', default : []}],
    likesCount: {type: Number, default: 0},
    parentCommentId : {type: mongoose.Schema.Types.ObjectId, ref: 'comments', default: null},
    repliesCount : {type: Number, default: 0},
    createdAt : {type: Date, default : Date.now, immutable : true},
    isEdited: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false}
});

const model = mongoose.model(collection, schema);

export default model;
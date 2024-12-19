import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'userPosts';

const schema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    postTitle : {type : String, required : true},
    postDescription : {type : String, default : ""},
    likedBy : [{type: mongoose.Schema.Types.ObjectId, ref : 'users', default : []}],
    comments : [{type : mongoose.Schema.Types.ObjectId, ref : 'comments', default : []}]
});

const model = mongoose.model(collection, schema);

export default model;
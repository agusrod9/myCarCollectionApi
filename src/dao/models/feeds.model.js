import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'userFeeds';

const schema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
    userPosts : [{type : mongoose.Schema.Types.ObjectId, ref : 'userPosts', default : []}]
});

const model = mongoose.model(collection, schema);

export default model;
import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'users';

const schema = new mongoose.Schema({
    firstName :  {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, required: true, index: true, unique: true},
    contactEmail : {type: String, required: true, unique: true},
    profilePicture : {type : String, required : true},
    password: { type: String, required: true },
    role : {type: String, default: 'REGULAR', enum:['REGULAR','PREMIUM','SUPER']},
    verifiedUser: {type: Boolean, default: false},
    verificationCode: {type: String, default:''},
    following : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    userCollections : [{type: mongoose.Schema.Types.ObjectId, ref : 'carCollections', default : {}}],
    userFeed : {type : mongoose.Schema.Types.ObjectId, ref : 'userFeeds'}
});

const model = new mongoose.model(collection, schema);

export default model;
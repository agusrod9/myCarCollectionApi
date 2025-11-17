import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'users';

const schema = new mongoose.Schema({
    firstName :  {type: String, required: true},
    lastName : {type: String, required: true},
    nickName : { type: String, required : true},
    email : {type: String, required: true, index: true, unique: true},
    contactEmail : {type: String, required: true, unique: true},
    profilePicture : {type : String, default : "https://avatar.iran.liara.run/public"},
    password: { type: String, required: true },
    mustResetPass : { type: Boolean, default : false},
    role : {type: String, default: 'FREE', enum:['FREE','BASIC','PREMIUM','PRO']},
    verifiedUser: {type: Boolean, default: false},
    active: {type: Boolean, default: false},
    verificationCode: {type: String, default : null},
    following : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    userCollections : [{type: mongoose.Schema.Types.ObjectId, ref : 'carCollections', default : null}],
    userFeed : {type : mongoose.Schema.Types.ObjectId, ref : 'userFeeds', default : null}
});

const model = new mongoose.model(collection, schema);

export default model;
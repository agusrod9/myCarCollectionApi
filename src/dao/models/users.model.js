import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'users';

const schema = new mongoose.Schema({
    firstName :  {type: String, required: true},
    lastName : {type: String, required: true},
    nickName : { type: String, required : true, unique: true, index: true },
    email : {type: String, required: true, index: true, unique: true},
    contactEmail : {type: String, required: true, unique: true},
    profilePicture : {type : String, default : "https://user-collected-cars-images-bucket.s3.us-east-2.amazonaws.com/public/user.webp"},
    password: { type: String, required: true },
    mustResetPass : { type: Boolean, default : false},
    role : {type: String, default: 'FREE', enum:['FREE','BASIC','PREMIUM','PRO']},
    verifiedUser: {type: Boolean, default: false},
    active: {type: Boolean, default: false},
    verificationCode: {type: String, default : null},
    following : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followingCount : {type: Number, default: 0},
    followersCount : {type: Number, default: 0},
    userCollections : [{type: mongoose.Schema.Types.ObjectId, ref : 'carCollections', default : []}],
    dateOfRegistration : {type: Date, default: Date.now, immutable : true},
    registrationNumber : {type: Number, required: true, unique: true},
    lastLogin : {type: Date, default: null},
    loginCount : {type: Number, default: 0},
    country: {type: String, default: null},
    level: {type: Number, default : 1},
    badges: [{type: mongoose.Schema.Types.ObjectId, ref: 'badges', default: []}],
    settings: {
        darkMode: {type: Boolean, default: false},
        emailNotifications: {type: Boolean, default: true},
        language: {type: String, default: null},
        mainCurrency : {type: mongoose.Schema.Types.ObjectId, ref: 'currencies', default: null},
        profilePrivacy : {type : String, enum : ['public', 'friendsOnly', 'private'], default: 'public'}
    },
    stats: {
        totalCars: { type: Number, default: 0 },
        totalCollections: { type: Number, default: 0 },
    },
    banned : {type: Boolean, default: false},
    banReason : {type: String, default: null},
    lastActiveAt: {type: Date, default: Date.now}
});

const model = new mongoose.model(collection, schema);

export default model;
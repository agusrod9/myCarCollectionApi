import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'users';

const schema = new mongoose.Schema({
    active: {type: Boolean, default: false},
    badges: [{type: mongoose.Schema.Types.ObjectId, ref: 'badges', default: []}],
    banned : {type: Boolean, default: false},
    banReason : {type: String, default: null},
    bio : {type: String, default: null},
    country: {type: String, default: null},
    collectorSince : {type: String, default: null},
    dateOfBirth : {type: Date, default : null},
    dateOfRegistration : {type: Date, default: Date.now, immutable : true},
    email : {type: String, required: true, index: true, unique: true},
    firstName :  {type: String, required: true},
    followers : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followersCount : {type: Number, default: 0},
    following : [{type : mongoose.Schema.Types.ObjectId, ref : 'users', default: []}],
    followingCount : {type: Number, default: 0},
    gender : {type: String, enum:['male', 'female'], default : null},
    googleId: {type: String, default: null},
    lastActiveAt: {type: Date, default: Date.now},
    lastLogin : {type: Date, default: null},
    lastName : {type: String, required: true},
    level: {type: Number, default : 1},
    loginCount : {type: Number, default: 0},
    mustResetPass : { type: Boolean, default : false},
    nickName : { type: String, required : true, unique: true, index: true },
    password: { type: String, required: true },
    previousEmail : {type: String, default : null},
    profilePicture : {type : String, default : "https://user-collected-cars-images-bucket.s3.us-east-2.amazonaws.com/public/user.webp"},
    registrationNumber : {type: Number, required: true, unique: true},
    role : {type: String, default: 'FREE', enum:['FREE','BASIC','PREMIUM','PRO']},
    score : {type: Number, default : 0},
    settings: {
        darkMode: {type: Boolean, default: false},
        emailNotifications: {type: Boolean, default: true},
        language: {type: String, default: null},
        mainCurrency : {type: mongoose.Schema.Types.ObjectId, ref: 'currencies', default: null},
        profilePrivacy : {type : String, enum : ['public', 'friendsOnly', 'private'], default: 'public'}
    },
    socialLinks : {
        type: [{
            platform : {type: String, enum : ['instagram', 'facebook', 'tiktok', 'x', 'youtube', 'other'], required : true},
            url : {type: String, required: true},
            label : {type : String}
        }], default : null
    },
    stats: {
        totalCars: { type: Number, default: 0 },
        totalCarsThisMonth : {type : Number, default: 0},
        totalCollections: { type: Number, default: 0 }
    },
    userCollections : [{type: mongoose.Schema.Types.ObjectId, ref : 'carCollections', default : []}],
    verificationCode: {type: String, default : null},
    verifiedUser: {type: Boolean, default: false},
});

const model = new mongoose.model(collection, schema);

export default model;
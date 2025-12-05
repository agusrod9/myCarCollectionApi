import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'contacts';

const schema = new mongoose.Schema({
    topic : {type : String, required : true},
    name : {type : String, required : true},
    email : {type : String, required : true},
    message : {type : String, required : true},
    attachmentUrl : {type : String, default : null},
    sendCopy : {type : Boolean, default : false},
    status : {type: String, enum: ["pending", "sent", "failed"], default : "pending"},
    createdAt : {type: Date, default: Date.now, immutable : true},
    sentAt : {type: Date, default: null},
    readStatus : {type : String, enum: ["unread", "read"], default : "unread"},
    readAt : {type: Date, default: null},
    priority : {type : String, enum: ["P3", "P2", "P1"], default : "P3"},
    userIp : {type : String, default : null},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
    ticketId : {type : String, default : null},
    ticketOwner : {type : String, default : null},
    ticketSolved : {type : Boolean, default : null},
    ticketSolvedAt : {type: Date, default: null},
    ticketSolvedBy : {type : String, default : null},
    teamNotes : {type : String, default : null},
    channel : {type : String, enum: ["web", "app"], required : true},
});


const model = new mongoose.model(collection, schema);
export default model;



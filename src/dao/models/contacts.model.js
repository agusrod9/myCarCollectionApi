import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'contacts';

const schema = new mongoose.Schema({
    attachmentUrl : {type : String, default : null},
    channel : {type : String, enum: ["web", "app"], required : true},
    createdAt : {type: Date, default: Date.now, immutable : true},
    email : {type : String, required : true},
    message : {type : String, required : true},
    name : {type : String, required : true},
    priority : {type : String, enum: ["P3", "P2", "P1"], default : "P3"},
    readAt : {type: Date, default: null},
    readStatus : {type : String, enum: ["unread", "read"], default : "unread"},
    sendCopy : {type : Boolean, default : false},
    sentAt : {type: Date, default: null},
    status : {type: String, enum: ["pending", "sent", "failed"], default : "pending"},
    teamNotes : {type : String, default : null},
    ticketId : {type : String, default : null},
    ticketOwner : {type : String, default : null},
    ticketSolved : {type : Boolean, default : null},
    ticketSolvedAt : {type: Date, default: null},
    ticketSolvedBy : {type : String, default : null},
    topic : {type : String, required : true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
    userIp : {type : String, default : null},
});


const model = new mongoose.model(collection, schema);
export default model;



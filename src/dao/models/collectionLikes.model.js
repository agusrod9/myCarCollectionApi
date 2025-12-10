import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'collectionLikes';

const schema = new mongoose.Schema({
    collectionId : {type: mongoose.Schema.Types.ObjectId, ref: 'carCollections', required: true},
    createdAt : {type: Date, default : Date.now, immutable : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
})


const model = mongoose.model(collection, schema);

export default model
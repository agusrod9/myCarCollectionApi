import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'carLikes';

const schema = new mongoose.Schema({
    carId : {type: mongoose.Schema.Types.ObjectId, ref: 'cars', required: true},
    createdAt : {type: Date, default : Date.now, immutable : true},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'users', required : true},
})

schema.index({ carId: 1, userId: 1 }, { unique: true });

const model = mongoose.model(collection, schema);

export default model
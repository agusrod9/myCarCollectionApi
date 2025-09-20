import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'cars';

const schema = new mongoose.Schema({
    carColor : {type: String, default : null},
    carMake : {type : String, required : true },
    carModel : {type : String, required : true },
    carYear : {type : Number, default : null },
    img_urls : [{type : String, default:[]}],
    manufacturer : {type : String, default : null},
    notes : {type : String, default : null},
    price : {type: Number, default: 0},
    opened : {type: String, enum: ['opened', 'sealed'], default: null},
    scale : {type: String, enum:['1/4', '1/5', '1/6', '1/8', '1/10', '1/12', '1/18', '1/24', '1/32', '1/36', '1/43', '1/48', '1/50', '1/55', '1/60', '1/61', '1/64', '1/70', '1/72', '1/76', '1/87', '1/100', '1/120', '1/148', '1/160', '1/200'], required: true},
    series : {type : String, default : null },
    series_num : {type : String, default : null },
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    collectionId : {type: mongoose.Schema.Types.ObjectId, ref: 'carCollections', default: null},
    dateAdded : {type: Date, required: true}
});

const model = new mongoose.model(collection,schema);

export default model;

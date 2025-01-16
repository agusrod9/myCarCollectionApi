import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'cars';

const schema = new mongoose.Schema({
    carColor : {type: String, required: true},
    carMake : {type : String, required : true },
    carModel : {type : String, required : true },
    carYear : {type : Number, required : true },
    img_urls : [{type : String, default:[]}],
    manufacturer : {type : String, default : null},
    notes : {type : String, default : null},
    opened : {type: String, enum: ['opened', 'sealed'], default: null},
    scale : {type: String, enum:[ '1/5','1/8','1/10', '1/12', '1/18', '1/24', '1/32', '1/36', '1/43', '1/64', '1/72', '1/87', '1/144', '1/160' ], required: true},
    series : {type : String, default : null },
    series_num : {type : String, default : null },
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    collectionId : {type: mongoose.Schema.Types.ObjectId, ref: 'carCollections', default: null}
});

const model = new mongoose.model(collection,schema);

export default model;

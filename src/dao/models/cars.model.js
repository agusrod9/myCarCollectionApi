import mongoose, {Schema} from "mongoose";

mongoose.pluralize(null);

const collection = 'cars';

const schema = new mongoose.Schema({
    carColor : {type: String, required: true},
    carMake : {type : String, required : true },
    carModel : {type : String, required : true },
    carYear : {type : Number, required : true },
    img_urls : {type : [String], default:[]},
    manufacturer : {type : String, default : ""},
    notes : {type : String, default : ""},
    opened : {type: String, enum: ['N/A', 'opened', 'sealed'], default: 'N/A'},
    scale : {type: String, enum:[ '1/5','1/8','1/10', '1/12', '1/18', '1/24', '1/32', '1/36', '1/43', '1/64', '1/72', '1/87', '1/144', '1/160' ], required: true},
    series : {type : String, default : 'N/A' },
    series_num : {type : String, default : 'N/A' },
    userId : {type: Schema.Types.ObjectId, ref: 'users', required: true}
});

const model = new mongoose.model(collection,schema);

export default model;

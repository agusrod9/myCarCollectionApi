import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'cars';

const schema = new mongoose.Schema({
    carColor : {type: String, default : null},
    carMake : {type : String, required : true, index: true },
    carModel : {type : String, required : true, index: true  },
    carYear : {type : Number, default : null },
    img_urls : [{type : String, default:[]}],
    manufacturer : {type : String, default : null, index: true },
    notes : {type : String, default : null},
    price : {
        type: new mongoose.Schema({
            currency : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'currencies',
                required: function(){
                    return this.price != null;
                }
            },
            amount : {
                type: Number,
                required: function(){
                    return this.price != null;
                }
            }
        }, {_id: false}),
        default:null   
    },
    opened : {type: String, enum: ['opened', 'sealed', 'damaged'], default: null},
    condition : {type: String, enum: ['poor', 'fair', 'good', 'excellent', 'mint'], default: null},
    scale : {type: String, enum:['1/4', '1/5', '1/6', '1/8', '1/10', '1/12', '1/18', '1/24', '1/32', '1/36', '1/43', '1/48', '1/50', '1/55', '1/60', '1/61', '1/64', '1/70', '1/72', '1/76', '1/87', '1/100', '1/120', '1/148', '1/160', '1/200'], required: true},
    series : {type : String, default : null },
    series_num : {type : String, default : null },
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    collectionId : {type: mongoose.Schema.Types.ObjectId, ref: 'carCollections', default: null},
    dateAdded : {type: Date, default: Date.now, immutable : true},
    lastUpdated : {type: Date, default: Date.now},
    accessories : [{type: mongoose.Schema.Types.ObjectId, ref: 'accessories', default: []}],
    forSale : {type: Boolean, default: false},
    listingId : {type: mongoose.Schema.Types.ObjectId, ref: 'listings', default: null},
    tags: [{ type: String, enum: ['JDM', 'Muscle', 'Rally', 'F1', 'Supercar', 'Hypercar', 'Classic', 'Offroad', 'Movies/Tv', 'Pick-up', 'SUV', 'EV', 'Concept', 'Prototype', 'Transport', 'Services', 'Construction' ], default: [] }],
    isFavorite : {type: Boolean, default: false},
    viewsCount: {type: Number, default: 0}
    
});

const model = new mongoose.model(collection,schema);

export default model;

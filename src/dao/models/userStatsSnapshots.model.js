import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'userStatsSnapshots';

const schema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'users', required : true, index: true},
    period : {
        year : {type : Number, required : true},
        month : {type : Number, required : true}
    },
    takenAt : {type: Date, default : Date.now, index: true},
    stats : {
        averageCarValue : Number,
        carsFromYear : Number,
        carsUpToYear : Number,
        estimatedTotalValue : Number,
        lastCarAddedAt : Date,
        lessExpensiveCar : {type : mongoose.Schema.Types.ObjectId, ref : 'cars', default: null},
        loginCount : Number,
        maxCarValue : Number,
        mostExpensiveCar : {type : mongoose.Schema.Types.ObjectId, ref : 'cars', default: null},
        minCarValue : Number,
        profileCompletion : Number,
        profileViews : Number,
        totalBrands : Number,
        totalCars: Number,
        totalCarsCountingStockOfEach: Number,
        totalCarsThisMonth : Number,
        totalCollections: Number,
        totalManufacturers : Number,
        totalPackageDamaged : Number,
        totalPackageLoose : Number,
        totalPackageOpened : Number,
        totalPackageSealed : Number,
        totalScales : Number,
        uniqueBrands : [String],
        uniqueManufacturers : [String],
        uniqueScales : [String]
    }
})

schema.index(
    {user: 1, 'period.year': 1, 'period.month': 1},
    {unique: true}
)

const model = new mongoose.model(collection,schema);

export default model;
import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'globalStats';

const schema = new mongoose.Schema({
    _id: { type: String, default: "GLOBAL_STATS" },
    dailyOnlineUsers : {type: Number, default: 0},
    lastUpdated : {type: Date, default: Date.now},
    monthlyOnlineUsers : {type: Number, default: 0},
    newCarsThisMonth: {type: Number, default: 0},
    newUsersThisMonth : {type: Number, default: 0},
    totalUsers : {type: Number, default: 0},
    totalActiveUsers : {type: Number, default: 0},
    totalCars : {type: Number, default: 0},
    totalCollections : {type: Number, default: 0},
    totalCountries : {type: Number, default: 0},
    totalLanguages : {type: Number, default: 0},
    totalOnlineUsers : {type: Number, default: 0},
    totalPaidUsers : {
        basic : {type: Number, default: 0},
        premium : {type: Number, default: 0},
        pro : {type: Number, default: 0}
    },
    uniqueCountries : [{type: String, default: []}],
    uniqueDailyOnlineUsers : [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],
    uniqueLanguages : [{type: String, default: []}],
    uniqueMonthlyOnlineUsers : [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],

});

const setLastUpdated = function(next) {
    this.set({ lastUpdated: new Date() });
    next();
};

schema.pre('findOneAndUpdate', setLastUpdated);
schema.pre('findByIdAndUpdate', setLastUpdated);
schema.pre('updateOne', setLastUpdated);

const model = new mongoose.model(collection, schema);

export default model;
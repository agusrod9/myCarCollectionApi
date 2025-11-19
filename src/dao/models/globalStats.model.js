import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = 'globalStats';

const schema = new mongoose.Schema({
    _id: { type: String, default: "GLOBAL_STATS" }, // voy a implementar singleton

    totalUsers : {type: Number, default: 0},
    totalActiveUsers : {type: Number, default: 0},
    totalOnlineUsers : {type: Number, default: 0},
    uniqueDailyOnlineUsers : [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],
    dailyOnlineUsers : {type: Number, default: 0},
    uniqueMonthlyOnlineUsers : [{type: mongoose.Schema.Types.ObjectId, ref: 'users', default: []}],
    monthlyOnlineUsers : {type: Number, default: 0},
    newUsersThisMonth : {type: Number, default: 0},
    totalPaidUsers : {
        basic : {type: Number, default: 0},
        premium : {type: Number, default: 0},
        pro : {type: Number, default: 0}
    },
    totalCars : {type: Number, default: 0},
    newCarsThisMonth: {type: Number, default: 0},
    totalCollections : {type: Number, default: 0},
    uniqueCountries : [{type: String, default: []}],
    totalCountires : {type: Number, default: 0},
    uniqueLanguages : [{type: String, default: []}],
    totalLanguages : {type: Number, default: 0},
    lastUpdated : {type: Date, default: Date.now},

});

const model = new mongoose.model(collection, schema);

export default model;
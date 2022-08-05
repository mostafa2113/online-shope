const mongoose = require("mongoose");
const Mongo_URL = "mongodb://localhost:27017/online-shop";

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
}, { timestamps: true })








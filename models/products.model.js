const mongoose = require("mongoose");
const Mongo_URL = "mongodb://localhost:27017/online-shop";
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
});
const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
    //connect to db
    //get products
    //disconnect
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                Product.find().then((products) => {
                    mongoose.disconnect();
                    resolve(products);
                });
            })
            .catch((err) => {
                reject(err);
                mongoose.disconnect();
            });
    });
};
exports.getProductsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                Product.find({ category }).then((products) => {
                    mongoose.disconnect();
                    resolve(products);
                });
            })
            .catch((err) => {
                reject(err);
                mongoose.disconnect();
            });
    });
};

exports.getProductsById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                Product.findById(id).then((products) => {
                    mongoose.disconnect();
                    resolve(products);
                });
            })
            .catch((err) => {
                reject(err);
                mongoose.disconnect();
            });
    });
};

exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                Product.findOne().then((product) => {
                    mongoose.disconnect();
                    resolve(product);
                });
            })
            .catch((err) => {
                reject(err);
                mongoose.disconnect();
            });
    });
};

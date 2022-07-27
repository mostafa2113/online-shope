const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Mongo_URL = "mongodb://localhost:27017/online-shop";

const userSchema = mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: String
});

const User = mongoose.model("user", userSchema);
exports.createNewUser = (username, email, password) => {
    //check if user already exists
    //yes=>error
    //no=>createNewUser
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                return User.findOne({ email })
                    .then((user) => {
                        if (user) {
                            reject("User already exists");
                            mongoose.disconnect();
                        } else {
                            return bcrypt.hash(password, 7);
                        }
                    })
                    .then((hash) => {
                        let user = new User({ username, email, password: hash });
                        return user.save();
                    });
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
                mongoose.disconnect();
            });
    });
};
exports.login = (email, password) => {
    //check if user exists
    //no=>error
    //yes=>check password
    //no=>error
    //yes=>set session
    return new Promise((resolve, reject) => {
        mongoose
            .connect(Mongo_URL)
            .then(() => {
                return User.findOne({ email });
            })
            .then((user) => {
                if (!user) {
                    mongoose.disconnect();
                    reject("User dosen't exists");
                } else {
                    bcrypt.compare(password, user.password).then((same) => {
                        if (!same) {
                            mongoose.disconnect();
                            reject("password dosen't match");
                        } else {
                            mongoose.disconnect();
                            resolve(user._id);
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                mongoose.disconnect();
                reject(error);
            });
    });
};

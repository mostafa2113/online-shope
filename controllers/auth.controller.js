const authModel = require('../models/auth.model');
const { validationResult } = require("express-validator")

exports.getSignup = (req, res, next) => {
    res.render("signup", { signupError: req.flash("signupError"), isUser: req.session.userId });
};

exports.postSignup = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        const { username, email, password } = req.body;
        authModel
            .createNewUser(username, email, password)
            .then(() => {
                res.redirect("/login");
            })
            .catch((err) => {
                res.redirect("/signup");
            });
    }
    else {
        req.flash("signupError",error.array());
        res.redirect("/signup");
    }
};

exports.getLogin = (req, res, next) => {

    res.render("login", { authError: req.flash("authError")[0], isUser: req.session.userId });
};

exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password).then((id) => {
        req.session.userId = id;
        res.redirect("/");
    }).catch((err) => {
        req.flash("authError", err)
        res.redirect("/login");
    });
};



exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
}





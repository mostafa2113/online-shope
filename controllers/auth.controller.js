const authModel = require('../models/auth.model');
const { validationResult } = require("express-validator")

exports.getSignup = (req, res, next) => {
    res.render("signup");
};

exports.postSignup = (req, res, next) => {
    const error = validationResult(req).array()
    if (!error) {
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
};

exports.getLogin = (req, res, next) => {
    
    res.render("login", { authError: req.flash("authError")[0] });
};

exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password).then((id) => {
        req.session.userId = id;
        res.redirect("/");
    }).catch((err) => {
        req.flash("authError",err)
        res.redirect("/login");
    });
};



exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
}





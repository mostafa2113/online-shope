const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authCtrl = require("../controllers/auth.controller")
const authValidation = require("../validation/auth.validator")
router.get('/signup', authCtrl.getSignup)
router.post('/signup', bodyParser.urlencoded({ extended: true }), authValidation.signup, authCtrl.postSignup)
router.get("/login", authCtrl.getLogin);
router.post('/login', bodyParser.urlencoded({ extended: true }), authCtrl.postLogin)
router.all("/logout", authCtrl.logout)
module.exports = router

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authCtrl = require("../controllers/auth.controller")
const authValidation = require("../validation/auth.validator")
const authGuard = require("./guards/auth.guard")

router.get('/signup', authGuard.notAuth,authCtrl.getSignup)
router.post('/signup', authGuard.notAuth, bodyParser.urlencoded({ extended: true }), authValidation.signup, authCtrl.postSignup)
router.get("/login", authGuard.notAuth, authCtrl.getLogin);
router.post('/login', authGuard.notAuth, bodyParser.urlencoded({ extended: true }), authCtrl.postLogin)
router.all("/logout", authGuard.isAuth, authCtrl.logout)
module.exports = router

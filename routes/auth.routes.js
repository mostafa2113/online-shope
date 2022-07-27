const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator")
const authCtrl = require("../controllers/auth.controller")

router.get('/signup', authCtrl.getSignup)
router.post('/signup', bodyParser.urlencoded({ extended: true }), authCtrl.postSignup)
router.get("/login", authCtrl.getLogin);
router.post('/login', bodyParser.urlencoded({ extended: true }), authCtrl.postLogin)
router.all("/logout", authCtrl.logout)
module.exports = router

const {check} = require('express-validator')
exports.signup=[
    check('username').isString().isLength({min:1,max:125})
    ,check("email").isEmail()
    ,check('password').isStrongPassword()
    , check('confirmPassword').custom((value,{req})=>{
        return value === req.body.password
    })
]
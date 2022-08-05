const productsModel = require('../models/products.model')


exports.getProductById = (req, res, next) => {
    //get id
    //get product
    //render
    let id = req.params.id;
    productsModel.getProductsById(id).then((product) => {
        res.render("product", { product, isUser: req.session.userId });
    }).catch((err) => {
        res.render("product", { product:false,isUser: req.session.userId})
    });
};
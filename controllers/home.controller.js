const productsModel = require('../models/products.model')

exports.getHome=(req, res, next)=>{
    //get products
    //render index
   
    //get category
    //if category && category !==all
    //  filter products
    //else
    //  render all
    const categories = ["clothes", "Phones","computers"];
    let category = req.query.category;
    if (categories.includes(category) && category !== "all") {
      productsModel.getProductsByCategory(category).then((products) => {
        res.render("index", { products });
      });
    } else {
      productsModel.getAllProducts().then((products) => {
        res.render("index", { products });
      });
    }

}
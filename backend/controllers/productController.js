const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncCatchError = require("../middleware/asyncErrorCatch");
const Features = require("../utils/features");

exports.createProduct = asyncCatchError(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })
})

exports.getProductDetails = asyncCatchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    res.status(200).json({
        success: true,
        product,

    })
})

exports.updateProduct = asyncCatchError(async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 403));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = asyncCatchError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(`Product Not Found`, 404))
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

exports.getAllProducts = asyncCatchError(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new Features(Product.find(), req.query).search().filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

  

    const apiFeature2 = new Features(Product.find(), req.query).search().filter().pagination(resultPerPage);;
    products = await apiFeature2.query;


    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

exports.getAdminProducts = asyncCatchError(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

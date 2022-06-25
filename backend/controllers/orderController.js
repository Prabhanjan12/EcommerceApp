const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncCatchError = require("../middleware/asyncErrorCatch");

exports.newOrder = asyncCatchError(async (req, res) => {

    const { shippingDetails,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body

    const order = await Order.create({
        shippingDetails,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order,
    });

})

exports.getSingleOrder = asyncCatchError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate
        ("user",
            "name email"
        );

    if (!order) {
        return next(new ErrorHandler("No order found on this Id"))
    }
    res.status(201).json({
        success: true,
        order,
    });

})

exports.myOrders = asyncCatchError(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id })

    

    res.status(200).json({
        success: true,
        orders,
    });

})

exports.getAllOrders = asyncCatchError(async (req, res, next) => {

    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });


    res.status(201).json({
        success: true,
        orders,
        totalAmount,
    });
})

exports.updateOrders = asyncCatchError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not found with this Id"));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("This order has already been delivered"));

    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity)
        });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
        
    });
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = asyncCatchError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});

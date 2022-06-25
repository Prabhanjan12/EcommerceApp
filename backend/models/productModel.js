const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter a Name"]
    },

    price: {
        type: Number,
        required: [true, "Please Enter the Price of Product"],
        maxlength: [8, "Price cannnot exceed 8 digits"]
    },

    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },

    category: {
        type: String,
        required: [true, "Please Enter Category"]
    },

    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxlength: [4, "Stock cannot exceed 4 in length"],
        default: 1
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)
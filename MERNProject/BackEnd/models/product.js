import mongoose from 'mongoose';

// define a structure or schema for the product
// using mongoose.Schema({})
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamp: true
});

// use mongoose.model to create/generate this schema
// name it product
const Product = mongoose.model("Product", productSchema);

// then export so it can be accessed
export default Product;
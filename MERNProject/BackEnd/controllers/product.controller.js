import mongoose from 'mongoose'
import Product from '../models/product.js'


export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json({success: true, data: product})
    } catch(err) {
        res.status(500).json({success: false, message: `server error ${err.message}`});
    }
}

export const createProducts = async (req, res) => {
    const product = req.body; // user will send data
    
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message: "Please provide all fields before submiting."});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch(err) {
        console.error(`error in creating product: ${err.message}`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProducts = async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "successfully deleted"})
    } catch(err) {
        res.status(400).json({success: false, message: `${err.message}`})
    }
}

export const updateProducts = async (req, res) => {
    const {id} = req.params;
    
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invaliid product id"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch(err) {
        res.status(500).json({success: false, message: "Server error"})
    }
}
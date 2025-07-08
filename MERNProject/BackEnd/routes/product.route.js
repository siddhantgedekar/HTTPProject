import express from 'express';
import {createProducts, getProducts, deleteProducts, updateProducts} from '../controllers/product.controller.js'

const router = express.Router();

// get products
router.get("/", getProducts);
// create products
router.post("/", createProducts);
// update products
router.put("/:id", updateProducts);
// delete products
router.delete("/:id", deleteProducts);



export default router;
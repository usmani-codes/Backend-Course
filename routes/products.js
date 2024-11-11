import express from "express";

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsCount } from '../controllers/productController.js'

const router = express.Router()

//get all Products
router.get('/', getProducts)

//get single Product
router.get('/:id', getProduct)

//create a Product
router.post('/', createProduct)

//update a Product
router.put('/:id', updateProduct)

//delete a Product
router.delete('/:id', deleteProduct)

router.get('/get/count', getProductsCount)


export default router
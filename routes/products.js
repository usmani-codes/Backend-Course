import express from "express";

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsCount, getFeaturedProducts, getFeaturedProductsWithCount } from '../controllers/productsController.js'

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
//get featured Products
router.get('/get/featured', getFeaturedProducts)
router.get('/get/featured/:count', getFeaturedProductsWithCount)
//get Products count
router.get('/get/count', getProductsCount)


export default router
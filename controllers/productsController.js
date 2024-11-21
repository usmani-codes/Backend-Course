import mongoose from "mongoose"
import Category from "../models/category.js"
import Product from "../models/Product.js"
import { getCategories } from "./categoriesController.js"

// @desc Get all products
// @route GET /api/v1/products
const getProducts = async (req, res, next) => {

    const {categories} = req.query
    let filterObj = {}

    if(categories){
        filterObj = {category:categories.split(',')}
    }


    const products = await Product.find(filterObj).populate("category")

    if (products.length === 0) {
        const error = new Error('No Product found')
        error.status = 404
        return next(error)
    }

    res.status(200).json({ success: true, data: products })
}

// @desc Get single Product
// @route GET /api/v1/products/:id
const getProduct = async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findOne({ _id: id }).populate("category")
    if (!product) {
        const error = new Error(`a product with id: ${id} was not found`)
        error.status = 404
        return next(error)
    }
    res.status(200).json({ msg: `product with id: ${id}`, data: product })
}


// @desc Create a product
// @route PRODUCT /api/v1/products
const createProduct = async (req, res, next) => {
    const { name, description, price, category, richDescription, image, images, brand, rating, numOfReviews, isFeatured, countInStock } = req.body

    if (!name || !category || !description || !price || !countInStock) {
        const error = new Error(`please fill all required fields !`)
        error.status = 400
        return next(error)
    }

    const productCategory = await Category.findOne({ _id: category })

    if (!productCategory) {
        const error = new Error(`please provide a vlid category!`)
        error.status = 401
        return next(error)
    }

    const product = new Product({ name, description, price, category, richDescription, image, images, brand, rating, numOfReviews, isFeatured, countInStock })
    await product.save(product)
    res.status(201).json({ msg: 'product Created', data: product })
}

// @desc Update a product
// @route PUT /api/v1/products/:id
const updateProduct = async (req, res, next) => {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error('invalid Id')
        error.status = 401
        next(error)
    }

    const { name, description, price, richDescription, image, images, brand, rating, numOfReviews, isFeatured, countInStock, category } = req.body

    const isValidCategory = await Category.findOne({ _id: category })

    if (!isValidCategory) {
        const error = new Error(`please provide a valid category`)
        error.status = 404
        return next(error)
    }

    const product = await Product.findOneAndUpdate({ _id: id }, { name, description, price, richDescription, image, images, brand, rating, numOfReviews, isFeatured, countInStock, category }, { new: true })

    if (!product) {
        const error = new Error(`no product Found with id ${id}`)
        error.status = 404
        return next(error)
    }

    res.status(201).json({ success: true, data: product })
}

// @desc Delete a product
// @route DELETE /api/v1/products/:id
const deleteProduct = async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findOneAndDelete({ _id: id })

    if (!product) {
        const error = new Error('product not found')
        error.status = 404
        return next(error)
    }
    const products = await Product.find({})

    res.status(200).json({ msg: 'product deleted', data: products })

}

// @desc Get featured product
// @route GET /api/v1/products/get/featured
const getFeaturedProducts = async (req, res, next) => {
    let { limit } = req.query
    limit = limit ? limit : 0
    const featuredProducts = await Product.find({ isFeatured: true }).limit(limit)
    // console.log(typeof limit)  // string
    if (!featuredProducts) return res.status(404).json({ success: false, msg: "no Featured Product avialable!" })

    res.status(200).json({ msg: "featured Products ", featuredProducts })
}
// @desc Get featured products with limit
// @route GET /api/v1/products/get/featured/:count
const getFeaturedProductsWithCount = async (req, res, next) => {
    const { count } = req.params
    const featuredProducts = await Product.find({ isFeatured: true }).limit(count ? count : 0)
    // console.log(typeof limit)  // string
    if (!featuredProducts) return res.status(404).json({ success: false, msg: "no Featured Product avialable!" })

    res.status(200).json({ msg: "featured Products ", featuredProducts })
}


// @desc Get product count
// @route GET /api/v1/products/get/count
const getProductsCount = async (req, res, next) => {
    // const products = await Product.find({})
    // res.status(200).json({ msg: `Total Products are ${products.length}` })

    const productCount = await Product.countDocuments()

    if (!productCount) return res.status(404).json({ success: false, msg: "no Product existed!" })

    res.status(200).json({ msg: "total Products ", productCount })
}


export { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsCount, getFeaturedProducts, getFeaturedProductsWithCount }
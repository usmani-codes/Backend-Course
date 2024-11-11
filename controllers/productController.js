import Product from "../models/Product.js"

// @desc Get all products
// @route GET /api/v1/products

const getProducts = async (req, res, next) => {

    const limit = parseInt(req.query.limit) //don't pass limit yet gives error of type casting
    console.log(typeof limit)
    const products = await Product.find({})
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json({ msg: 'success', data: products }) //for now returning all of them
    }
    res.status(200).json({ msg: 'All products', data: products })
}

// @desc Get single Product
// @route GET /api/v1/products/:id

const getProduct = async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findOne({ _id: id })
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
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    if (!product.name || !product.image || !product.countInStock) {
        const error = new Error(`please fill both fields`)
        error.status = 400
        return next(error)
    }
    await product.save(product)
    res.status(201).json({ msg: 'product Created', data: product })
}

// @desc Update a product
// @route PUT /api/v1/products/:id
const updateProduct = async (req, res, next) => {
    const id = req.params.id
    const name = req.body.name
    const image = req.body.image
    const countInStock = req.body.countInStock

    console.log(name, image, countInStock)

    const product = await Product.findOneAndUpdate({ _id: id }, { name, image })
    if (!product) {
        const error = new Error(`no product Found with id ${id}`)
        error.status = 404
        return next(error)

    }

    res.status(201).json({ msg: 'product updated ', data: product })
}

// @desc Delete a product
// @route DELETE /api/v1/products/:id
const deleteProduct = async (req, res, next) => {
    const id = req.params.id
    const product = await Product.findOneAndDelete({ _id: id })

    console.log("product", product, id)

    if (!product) {
        const error = new Error('product not found')
        error.status = 404
        return next(error)
    }
    const products = await Product.find({})

    res.status(200).json({ msg: 'product deleted', data: products })

}

// @desc Get product count
// @route GET /api/v1/products/get/count
const getProductsCount = async (req, res, next) => {
    const products = await Product.find({})
    res.status(200).json({ msg: `Total Products are ${products.length}`, data: products.length })
}


export { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsCount }
import mongoose from "mongoose";
import Order from "../models/order.js";
import OrderItem from "../models/orderItem.js";
import Product from "../models/Product.js";

// @desc Get all orders
// @route GET /api/v1/orders
const getOrders = async (req, res, next) => {
    const orders = await Order.find({}).populate('user', "name email").sort({ orderedDate: -1 })

    if (!orders.length) {
        return res.status(404).json({ success: false, message: 'no orders found' })
    }

    return res.json({ success: true, data: orders })
}

// @desc get a single order
// @route GET /api/v1/orders/:id
const getOrder = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: 'invalid Id ' })
    }
    const order = await Order.findOne({ _id: id }).populate("user").populate({ path: "orderItems", populate: { path: "product", populate: "category" } })

    if (!order) {
        return res.status(404).json({ success: false, message: 'no order found with this id' })
    }

    return res.json({ success: true, data: order })
}


// @desc Create a orders
// @route POST /api/v1/orders
const createOrder = async (req, res, next) => {
    const { orderItems, shipingAddress, shipingAddress2, city, zip, country, phone, status = 'pending', user } = req.body

    let validProductId = true
    let totalPrice = 0

    let orderItemsIds = await Promise.all(orderItems.map(async (item) => {

        const product = await Product.findOne({ _id: item.product })

        if (!product) {
            validProductId = false
            console.log('product does not existed ..')
            return
        }

        totalPrice += product.price * item.quantity

        let newOrderItem = new OrderItem({
            quantity: item.quantity,
            product: item.product
        })

        newOrderItem = await newOrderItem.save()
        console.log(`order submitted for item: ${item.product}`)
        return newOrderItem._id
    }))

    if (!validProductId) {
        console.log("order could not submitted.. ")
        return res.status(400).json({ success: false, msg: "please provide a valid product id" })
    }


    if (!orderItemsIds.length || !shipingAddress || !city || !zip || !country || !phone || !user) {
        return res.status(400).json({ success: false, msg: 'please fill all required fieldssar' })
    }


    const order = new Order({ orderItems: orderItemsIds, totalprice: totalPrice, shipingAddress, shipingAddress2, city, zip, country, phone, status, user })
    await order.save(order)

    if (!order) {
        return res.status(500).json({ success: false, msg: "order couldn't submitted" })
    }

    res.status(201).json({ msg: 'order submitted!!', data: order })
}


// @desc update orders status
// @route PUT /api/v1/orders
const updateOrder = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, msg: 'Invalid Id ..' })
    }

    const order = await Order.findOneAndUpdate({ _id: id }, { status }, { new: true })

    if (!order) {
        return res.status(404).json({ success: false, msg: 'order with this id not found' })
    }

    res.status(201).json({ msg: 'order updated ', data: order })
}

// @desc delete a order by id
// @route DELETE /api/v1/orders/:id
const deleteOrder = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, msg: "invalid Id" })
    }

    let order = await Order.findOne({ _id: id })

    const orderItems = order?.orderItems

    if (orderItems) {
        orderItems.map(async (itemId) => {
            console.log("deleting order items..", itemId)
            await OrderItem.findOneAndDelete(itemId)
        })
    }

    console.log("deleting order ..")
    order = await Order.findOneAndDelete({ _id: id })

    if (!order) {
        console.log("order not found..")
        return res.status(404).json({ success: true, message: `order not found` })
    }

    res.status(200).json({ success: true, message: `order deleted`, order })
}

// @desc get total orders of a user
// @route GET /api/v1/orders/get/userorders/:id
const getUserOrders = async (req, res, next) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: 'invalid Id ' })
    }
    const order = await Order.findOne({ user: id }).populate({ path: 'orderItems', populate: { path: 'product', populate: 'category' } })

    if (!order) {
        return res.status(404).json({ success: false, message: 'no order found with this id' })
    }

    return res.json({ success: true, data: order })
}

// @desc get orders total count
// @route GET /api/v1/orders/get/userorders/count/:id
const getUserOrdersCount = async (req, res, next) => {
    const orders = await Order.countDocuments({ user: req.params.id })
    res.status(200).json({ success: true, totalOrders: orders })
}


// @desc get total sales
// @route GET /api/v1/orders/get/sales
const getTotalSales = async (req, res, next) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalSales: { $sum: '$totalprice' } } }
    ])
    res.status(200).json({ success: true, totalSales: totalSales[0].totalSales })
}


// @desc get  total orders count
// @route GET /api/v1/orders/get/count
const getOrdersCount = async (req, res, next) => {
    const orders = await Order.countDocuments()
    res.status(200).json({ success: true, totalOrders: orders })
}

export { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersCount, getTotalSales, getUserOrders, getUserOrdersCount }
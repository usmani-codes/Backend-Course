import express from "express";

import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersCount, getTotalSales, getUserOrders, getUserOrdersCount } from '../controllers/ordersController.js'
import { AdminsOnly } from "../middlewares/adminOnly.js";

const router = express.Router()

//get all Orders
router.get('/', getOrders)

//get single Order
router.get('/:id', getOrder)

//create a Order
router.post('/', createOrder)

//update a Order
router.put('/:id', AdminsOnly, updateOrder)

//delete a Order
router.delete('/:id', AdminsOnly, deleteOrder)

//get all orders of a user
router.get('/get/userorders/:id', getUserOrders)

//get user's orders count
router.get('/get/userorders/count/:id', getUserOrdersCount)

// get total sales
router.get('/get/sales', getTotalSales)
//get total orders count
router.get('/get/count', getOrdersCount)


export default router
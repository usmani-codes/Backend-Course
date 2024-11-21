import express from "express";

import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersCount } from '../controllers/ordersController.js'

const router = express.Router()

//get all Orders
router.get('/', getOrders)

//get single Order
router.get('/:id', getOrder)

//create a Order
router.post('/', createOrder)

//update a Order
router.put('/:id', updateOrder)

//delete a Order
router.delete('/:id', deleteOrder)

router.get('/get/count', getOrdersCount)


export default router
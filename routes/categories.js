import express from "express";

import { getCategories, getCategory, createCategory, updateCategory, deleteCategory, getCategoriesCount } from '../controllers/categoriesController.js'

const router = express.Router()

//get all Categorys
router.get('/', getCategories)

//get single Category
router.get('/:id', getCategory)

//create a Category
router.post('/', createCategory)

//update a Category
router.put('/:id', updateCategory)

//delete a Category
router.delete('/:id', deleteCategory)

router.get('/get/count', getCategoriesCount)


export default router
import Category from '../models/category.js'

// @desc Get all categories
// @route GET /api/v1/categories
const getCategories = async (req, res, next) => {
    const categories = await Category.find({})

    console.log("categories: ", categories)

    //server crashes when there's no category in categories. it's an empty array [] and []'s value is true the below condition doesn't execute
    // should not we be checking its length ? categories.length <= 0 || categories.length === 0
    if (!categories) {
        return res.status(404).json({ success: false, message: 'no Categories found' })
    }

    res.json({ success: true, data: categories })
}

// @desc Get category by id
// @route GET /api/v1/categories
const getCategory = async (req, res, next) => {
    const { id } = req.params
    const category = await Category.findOne({ _id: id })

    console.log("category: ", category)

    if (!category) {
        return res.status(404).json({ success: false, message: 'no Category found with this id' })
    }

    res.json({ success: true, data: category })
}

// @desc Create a new Post
// @route POST /api/v1/categories
const createCategory = async (req, res, next) => {
    const { name, icon, color } = req.body

    if (!name) {
        return res.status(404).json({ success: false, msg: 'name is required to create a category' })
    }

    const category = await Category.findOne({ name: name })

    if (category) {
        return res.status(401).json({ success: false, message: 'the category already exists!' })
    }

    const newCategory = new Category({ name, icon, color })
    newCategory.save()

    if (!newCategory) {
        res.status(404).json({ success: false, message: 'the category cannot be created!' })
    }

    res.status(200).json({ success: true, data: newCategory })
}


// @desc update a Post by id
// @route PUT /api/v1/categories/:id
const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const { name, icon, color } = req.body

    const category = await Category.findOneAndUpdate({ _id: id }, { name, icon, color }, { new: true })

    if (!category) {
        return res.status(404).json({ success: false, msg: 'category with this id not found' })
    }

    res.status(201).json({ msg: 'category updated ', data: category })
}

// @desc delete a Post by id
// @route DELETE /api/v1/categories/:id
const deleteCategory = async (req, res, next) => {
    const { id } = req.params

    // crashing server with error when I pass shorter id 

    const category = await Category.findOneAndDelete({ _id: id })
    console.log("category: ", category)

    if (!category) {
        return res.status(404).json({ success: true, message: `category not found` })
    }
    const categories = await Category.find({})
    //after deleting an item (category) what should i retrun as data ? the deleted obj or categories 
    res.status(200).json({ success: true, message: `category deleted`, category: categories })
}

// @desc get categories total count
// @route GET /api/v1/categories/get/count
const getCategoriesCount = async (req, res, next) => {
    const categories = await Category.find({})
    res.status(200).json({ success: true, message: `total categories are: ${categories.length}` })
}

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory, getCategoriesCount }
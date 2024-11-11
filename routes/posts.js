import express from "express";

import { getPosts, getPost, createPost, updatePost, deletePost, getPostsCount } from '../controllers/postController.js'

const router = express.Router()

//get all posts
router.get('/', getPosts)

//get single post
router.get('/:id', getPost)

//create a post
router.post('/', createPost)

//update a post
router.put('/:id', updatePost)

//delete a post
router.delete('/:id', deletePost)

router.get('/get/count', getPostsCount)


export default router
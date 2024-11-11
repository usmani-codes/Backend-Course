
let posts = [
    {
        "id": 1,
        "title": "Understanding JavaScript Closures",
        "author": "John Doe"
    },
    {
        "id": 2,
        "title": "A Guide to RESTful APIs",
        "author": "Jane Smith"
    },
    {
        "id": 3,
        "title": "Introduction to Docker",
        "author": "Alice Johnson"
    },
    {
        "id": 4,
        "title": "Exploring the New Features in Python 3.10",
        "author": "Bob Brown"
    },
    {
        "id": 5,
        "title": "Mastering CSS Grid Layout",
        "author": "Eve Davis"
    }
]


// @desc Get all posts
// @route GET /api/v1/posts

const getPosts = (req, res, next) => {
    const limit = req.query.limit
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json({ msg: 'success', data: posts.slice(0, limit) })
    }
    res.status(200).json({ msg: 'All posts', data: posts })
}

// @desc Get single post
// @route GET /api/v1/posts/:id

const getPost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)
    if (!post) {
        const error = new Error(`a post with id: ${id} was not found`)
        error.status = 404
        return next(error)
    }
    res.status(200).json({ msg: `Post with id: ${id}`, data: post })
}


// @desc Create a post
// @route POST /api/v1/posts
const createPost = (req, res, next) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        author: req.body.author
    }

    if (!post.title || !post.author) {
        const error = new Error(`please fill both fields`)
        error.status = 400
        return next(error)
    }
    posts.push(post)
    res.status(201).json({ msg: 'post Created', data: post })
}

// @desc Update a post
// @route PUT /api/v1/posts/:id
const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id)

    const post = posts.find(post => post.id === id)
    if (!post) {
        const error = new Error(`no Post Found with id ${id}`)
        error.status = 404
        return next(error)

    }
    post.title = req.body.title
    post.author = req.body.author

    res.status(201).json({ msg: 'Post updated ', data: post })
}

// @desc Delete a post
// @route DELETE /api/v1/posts/:id
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find(post => post.id === id)

    console.log("Post", post, id)

    if (!post) {
        const error = new Error('Post not found')
        error.status = 404
        return next(error)
    }


    posts = posts.filter(post => post.id !== id)
    res.status(200).json({ msg: 'post deleted', data: posts })

}

// @desc Get post count
// @route GET /api/v1/posts/get/count
const getPostsCount = (req, res, next) => {
    res.status(200).json({ msg: 'Total Posts', data: posts.length })
}


export { getPosts, getPost, createPost, updatePost, deletePost, getPostsCount }
const Blog = require('../Models/blogModel')

//get all Blogs
const showBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get Single blog
const showSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}
//add Blogs
const addBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        author: req.body.author,
    })
    try {
        const savedBlog = await blog.save()
        res.status(200).json(savedBlog)
    } catch (err) {
        res.status(500).json(err)
    }
}

//update Blogs
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (req.body.author === blog.author) {
            try {
                const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedBlog)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("Try to update only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete Blogs
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (req.body.author === blog.author) {
            try {
                await Blog.findByIdAndDelete(req.params.id)
                res.status(200).json("Blog Deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("Try to delete only your post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    showBlog,
    showSingleBlog,
    addBlog,
    updateBlog,
    deleteBlog
}
const express = require('express')
const router = express.Router()
const {
    showBlog,
    showSingleBlog,
    addBlog,
    updateBlog,
    deleteBlog
} = require("../Controllers/blogController")

router.get("/all-blogs", showBlog)

router.get("/:id", showSingleBlog)

router.post("/add", addBlog)

router.put("/update/:id", updateBlog)

router.delete("/delete/:id", deleteBlog)


module.exports = router
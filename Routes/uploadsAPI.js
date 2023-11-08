const express = require('express')
const router = express.Router()
const upload = require('../Controllers/imageController')

router.post('/', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.status(200).json("File uploaded")
});

module.exports = router
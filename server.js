const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./dbConfig/dbConnect')
const blogAPIs = require('./Routes/handleBlogAPI')
const userAPIs = require('./Routes/handleUserAPI')
const uploadAPI = require('./Routes/uploadsAPI')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

//mongodb connection
connectDB()

app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_LOCAL_URL, "https://cosmolog-app.onrender.com"]
}))

//static file
app.use('/', express.static(path.join(__dirname, 'public')))

//handle routes
app.use("/", require("./Routes/root"))


app.use("/api/blog", blogAPIs)
app.use("/api/users", userAPIs)
app.use("/api/blog/upload", uploadAPI)

//handling all remaining request
app.all("*", (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts('json')) {
        res.json({ message: "404 not found" })
    } else {
        res.type('txt').send('404 not found')
    }
})

//npm run dev



app.listen(process.env.PORT, () => {
    console.log(`Server initiated to ${process.env.PORT}`)
})
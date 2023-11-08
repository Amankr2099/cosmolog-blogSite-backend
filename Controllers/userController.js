const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const Blog = require('../Models/blogModel')



//get all users
const showUser = async (req, res) => {
    const users = await Blog.find({})
    res.send(users)
}

//add users
const addUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update users
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(501).json("Try to update only your account")
    }
}

//delete users
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Blog.deleteMany({ author: user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User is deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } catch (error) {
            res.status(404).json("User Not found!")
        }
    } else {
        res.status(501).json("Try to delete only your account")
    }
}

//login
const loginUser = async (req, res) => {
    try {
        const entredUser = await User.findOne({ username: req.body.username })
        if (!entredUser) {
            res.status(400).json("No user with this username")

        }

        const entredPassword = await bcrypt.compare(req.body.password, entredUser.password)
        if (!entredPassword) {
            res.status(400).json("Wrong Password")

        }
        res.status(200).json(entredUser)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    showUser,
    addUser,
    updateUser,
    deleteUser,
    loginUser
}
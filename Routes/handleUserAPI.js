const express = require('express')
const router = express.Router()
const {
    showUser,
    addUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../Controllers/userController')


//signup
router.post("/register", addUser)

//login
router.post("/login", loginUser)

//update
router.put("/:id", updateUser)

//delete
router.delete("/:id", deleteUser)



module.exports = router
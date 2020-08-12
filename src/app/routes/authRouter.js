const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

router.post('/register', authController.register)
router.post('/authenticate', authController.authenticate)
router.post('/forgot_password', authController.forgot_pass)
router.post('/reset_password', authController.resetPassword)


module.exports = router;

 
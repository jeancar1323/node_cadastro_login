const express = require('express')
const router = express.Router();
const projectController = require("../controller/projectController");
const authMiddle = require("../middleware/authMiddle")


router.get("/",authMiddle, projectController.token)

module.exports = router
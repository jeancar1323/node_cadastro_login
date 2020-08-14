const express = require('express')
const router = express.Router();
const projectController = require("../controller/projectController");
const authMiddle = require("../middleware/authMiddle")

router.get('/list_all', authMiddle,projectController.listAll)
router.get('/show', authMiddle, projectController.show )
router.post('/create', authMiddle,projectController.create)
router.put('/update', authMiddle, projectController.update)
router.delete('/delete', authMiddle,projectController.delete)



module.exports = router
const express = require('express')
const router = express.Router();
const taskController = require("../controller/taskController");
const {checkTaskId,checkProjectId} = require('../middleware/taskMiddle');


router.post('/create', checkProjectId ,taskController.create)
router.get('/list_all',taskController.listAll)
router.get('/show',checkTaskId,taskController.show)
router.put('/update',checkTaskId,taskController.update)
router.delete('/delete',checkTaskId,taskController.delete)

module.exports = router;
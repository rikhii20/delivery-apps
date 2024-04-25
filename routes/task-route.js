const express = require('express');
const router = express.Router();

const { createTask, updateStatus } = require('../controllers/task-controller');

const { isLogin, isSupervisi } = require('../middlewares/auth');

router.post('/', isSupervisi, createTask);
router.put('/:id', isLogin, updateStatus);

module.exports = router;

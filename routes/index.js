const express = require('express');
const router = express.Router();

const authRoute = require('./auth-route');
const deliverymanRoute = require('./deliveryman-route');
const taskRoute = require('./task-route');
const supervisiRoute = require('./supervisi-route');

router.use('/auth', authRoute);
router.use('/deliveryman', deliverymanRoute);
router.use('/task', taskRoute);
router.use('/supervisi', supervisiRoute);

module.exports = router;

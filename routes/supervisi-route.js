const express = require('express');
const router = express.Router();

const {
  fetchAllAcitivity,
  percentageTasks,
  rankingDeliveryman
} = require('../controllers/supervisi-controller');

const { isLogin, isSupervisi } = require('../middlewares/auth');

router.get('/activity-deliveryman', isSupervisi, fetchAllAcitivity);
router.get('/task-percentage', isSupervisi, percentageTasks);
router.get('/ranking-deliveryman', isSupervisi, rankingDeliveryman);

module.exports = router;

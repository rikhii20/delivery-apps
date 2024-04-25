const express = require('express');
const router = express.Router();

const {
  fetchAll,
  assignSupervisi,
  percentageTasks,
  rankingDeliveryman,
  update
} = require('../controllers/deliveryman-controller');

const { isLogin, isSupervisi } = require('../middlewares/auth');

router.get('/', isLogin, fetchAll);
router.get('/task-percentage', isSupervisi, percentageTasks);
router.get('/ranking-deliveryman', isSupervisi, rankingDeliveryman);
router.put('/assign/:id', isSupervisi, assignSupervisi);
router.put('/update/:id', isLogin, update);

module.exports = router;

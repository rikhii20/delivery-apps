const { Deliveryman, Supervisi, Task } = require('../models');
const catchError = require('../utils/catchError');
const Joi = require('joi');
const { Op } = require('sequelize');

module.exports = {
  fetchAllAcitivity: async (req, res) => {
    try {
      const allDeliveryman = await Deliveryman.findAll({
        include: [
          {
            model: Task,
            as: 'tasks',
            attributes: ['status', 'location', 'createdAt', 'updatedAt']
          }
        ],
        attributes: {
          exclude: ['password']
        },
        where: { supervisi_id: req.user.id }
      });
      res.status(200).json({
        status: 'Success',
        message: 'Successfully fetch data',
        result: allDeliveryman
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  percentageTasks: async (req, res) => {
    try {
      const allDeliveryman = await Deliveryman.findAll({
        attributes: {
          exclude: ['password']
        },
        where: { supervisi_id: req.user.id }
      });
      const deliverymanIds = allDeliveryman.map((e) => e.id);
      const tasks = await Task.findAll({
        order: [['deliveryman_id', 'asc']],
        where: {
          deliveryman_id: {
            [Op.in]: deliverymanIds
          }
        }
      });
      //   const data = [];
      //   for (let i = 0; i < tasks.length; i++) {
      //     data.push();
      //   }
      res.status(200).json({
        status: 'Success',
        message: 'Successfully fetch data',
        result: tasks
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  rankingDeliveryman: async (req, res) => {
    try {
      const allDeliveryman = await Deliveryman.findAll({
        attributes: {
          exclude: ['password']
        },
        where: { supervisi_id: req.user.id }
      });
      const deliverymanIds = allDeliveryman.map((e) => e.id);
      const tasks = await Task.findAll({
        order: [['deliveryman_id', 'asc']],
        where: {
          deliveryman_id: {
            [Op.in]: deliverymanIds
          }
        }
      });
      res.status(200).json({
        status: 'Success',
        message: 'Successfully fetch data',
        result: tasks
      });
    } catch (error) {
      catchError(error, res);
    }
  }
};

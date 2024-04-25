const { Deliveryman, Task } = require('../models');
const catchError = require('../utils/catchError');
const Joi = require('joi');
const { Op } = require('sequelize');

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const deliverymans = await Deliveryman.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      res.status(200).json({
        status: 'Success',
        message: 'Successfully fetch list deliveryman',
        result: deliverymans
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  assignSupervisi: async (req, res) => {
    const { id } = req.params;
    try {
      const update = await Deliveryman.update(
        { supervisi_id: req.user.id },
        { where: { id } }
      );
      if (update[0] != 1) {
        return res.status(500).json({
          status: 'Internal server error',
          message: 'Failed update the data / data not found'
        });
      }
      const task = await Deliveryman.findOne({
        where: {
          id
        },
        attributes: {
          exclude: ['password']
        }
      });
      res.status(200).json({
        status: 'Success',
        message: 'successfuly update the data',
        result: task
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  percentageTasks: async (req, res) => {
    let { page, limit } = req.query;
    try {
      // pagination
      if (!page) {
        page = 1;
      }

      // limit data
      let limitation;
      if (!limit) {
        limitation = 8;
      } else {
        limitation = Number(limit);
      }

      const tasks = await Task.findAll({
        order: [['deliveryman_id', 'asc']],
        limit: limitation,
        offset: (page - 1) * limitation
      });
      const data = [];
      tasks.forEach((e) => {
        data.push(e.deliveryman_id);
      });

      console.log(...new Set(data));
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
    let { page, limit } = req.query;

    try {
      // pagination
      if (!page) {
        page = 1;
      }

      // limit data
      let limitation;
      if (!limit) {
        limitation = 8;
      } else {
        limitation = Number(limit);
      }

      const allDeliveryman = await Deliveryman.findAll({
        attributes: {
          exclude: ['password']
        }
      });
      const deliverymanIds = allDeliveryman.map((e) => e.id);
      const tasks = await Task.findAll({
        order: [['deliveryman_id', 'asc']],
        limit: limitation,
        offset: (page - 1) * limitation,
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
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { last_location, status } = req.body;
      const update = await Deliveryman.update(
        { last_location, status },
        { where: { id: req.user.id } }
      );
      if (update[0] != 1) {
        return res.status(500).json({
          status: 'Internal server error',
          message: 'Failed update the data / data not found'
        });
      }
      const deliveryman = await Deliveryman.findOne({
        where: {
          id
        },
        attributes: {
          exclude: ['password']
        }
      });
      res.status(200).json({
        status: 'Success',
        message: 'successfuly update the data',
        result: deliveryman
      });
    } catch (error) {
      catchError(error, res);
    }
  }
};

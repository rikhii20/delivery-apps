const { Task } = require('../models');
const catchError = require('../utils/catchError');
const Joi = require('joi');

module.exports = {
  createTask: async (req, res) => {
    const { deliveryman_id, status, location } = req.body;
    try {
      const schema = Joi.object().keys({
        deliveryman_id: Joi.number().required(),
        status: Joi.string().allow(''),
        location: Joi.string().required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 'Bad Request',
          message: error.message
        });
      }
      const create = await Task.create({
        deliveryman_id,
        status,
        location
      });
      res.status(201).json({
        status: 'Success',
        message: 'Successfully create task',
        result: create
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  updateStatus: async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    try {
      const schema = Joi.object().keys({
        status: Joi.string().required()
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 'Bad Request',
          message: error.message
        });
      }
      const update = await Task.update(
        { status },
        { where: { deliveryman_id: req.user.id } }
      );
      if (update[0] != 1) {
        return res.status(500).json({
          status: 'Internal server error',
          message: 'Failed update the data / data not found'
        });
      }
      const task = await Task.findOne({
        where: {
          id
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
  }
};

const { Supervisi, Deliveryman } = require('../models');
const jwt = require('jsonwebtoken');
const catchError = require('../utils/catchError');

module.exports = {
  isLogin: async (req, res, next) => {
    try {
      let token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({
          status: 'Unauthorized',
          message: 'No token detected'
        });
      }
      token = token.replace('Bearer ', '');
      jwt.verify(token, process.env.SECRET_TOKEN, async (error, decoded) => {
        if (error) {
          return res.status(401).json({
            status: 'Unauthorized',
            message: 'Invalid access token'
          });
        }
        let user;
        if (Number(decoded.username) >= 2000) {
          user = await Supervisi.findOne({
            where: {
              id: decoded.id
            }
          });
        } else {
          user = await Deliveryman.findOne({
            where: {
              id: decoded.id
            }
          });
        }
        if (!user) {
          return res.status(401).json({
            status: 'Unauthorized',
            message: 'User not found'
          });
        }
        req.user = {
          id: decoded.id,
          username: decoded.username
        };
        next();
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  isSupervisi: async (req, res, next) => {
    try {
      let token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({
          status: 'Unauthorized',
          message: 'No token detected',
          result: {}
        });
      }
      token = token.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

      const user = await Supervisi.findOne({
        where: {
          id: decoded.id
        }
      });
      if (!user) {
        return res.status(401).json({
          status: 'Unauthorized',
          message: 'You have no right to access this endpoint'
        });
      }
      req.user = {
        id: user.id,
        usernmae: user.nik
      };
      next();
    } catch (error) {
      errorHandler(error, res);
    }
  }
};

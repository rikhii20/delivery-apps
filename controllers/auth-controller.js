const jwt = require('jsonwebtoken');
const { Supervisi, Deliveryman } = require('../models');
const bcrypt = require('bcrypt');
const catchError = require('../utils/catchError');
const Joi = require('joi');

module.exports = {
  register: async (req, res) => {
    const { username, name, phone, gender, password } = req.body;
    try {
      const checkSupervisi = await Supervisi.findOne({
        where: {
          nik: username
        }
      });
      const checkDeliveryman = await Deliveryman.findOne({
        where: {
          nik: username
        }
      });
      if (checkSupervisi || checkDeliveryman) {
        return res.status(400).json({
          status: 'Bad Request',
          message: 'Username already exists'
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      let createAccount;
      if (Number(username) >= 2000) {
        createAccount = await Supervisi.create({
          name,
          nik: username,
          gender,
          phone,
          password: hashedPassword
        });
      } else {
        createAccount = await Deliveryman.create({
          name,
          nik: username,
          gender,
          phone,
          password: hashedPassword
        });
      }
      const token = jwt.sign(
        {
          id: createAccount.id,
          username: createAccount.nik
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '24h' }
      );
      res.status(201).json({
        status: 'Success',
        message: 'Successfully to create an account',
        result: {
          token,
          user: {
            name: createAccount.name,
            nik: createAccount.nik,
            phone: createAccount.phone,
            gender: createAccount.gender
          }
        }
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      let checkUser;
      if (Number(username >= 2000)) {
        checkUser = await Supervisi.findOne({
          where: {
            nik: username
          }
        });
      } else {
        checkUser = await Deliveryman.findOne({
          where: {
            nik: username
          }
        });
      }
      if (!checkUser) {
        return res.status(401).json({
          status: 'Unauthorized',
          message: 'Invalid email and password combination'
        });
      }
      const valid = await bcrypt.compare(password, checkUser.password);
      if (!valid) {
        return res.status(401).json({
          status: 'Unauthorized',
          message: 'Invalid email and password combination'
        });
      }
      const token = jwt.sign(
        {
          username: checkUser.nik,
          id: checkUser.id
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '24h' }
      );

      res.status(200).json({
        status: 'Success',
        message: 'Logged in successfully',
        result: {
          token,
          user: {
            name: checkUser.name,
            nik: checkUser.nik,
            phone: checkUser.phone,
            gender: checkUser.gender
          }
        }
      });
    } catch (error) {
      catchError(error, res);
    }
  }
};

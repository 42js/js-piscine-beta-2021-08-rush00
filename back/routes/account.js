const bcrypt = require('bcrypt');
const express = require('express');
const cookieParser = require('cookie-parser');
const {
  decodeToken,
  issueRefreshToken,
  issueAccessToken,
  invalidateRefreshToken,
  invalidateAccessToken,
  verifyToken,
} = require('./auth/authJwt');
const { User } = require('../models/index');

const router = express.Router();

const badRequest = { msg: 'Bad Request' };
const wrongInfo = { msg: 'Wrong username or password' };
const alreadyLoggedIn = { msg: 'Already logged in' };
const alreadyExist = { msg: 'User already exists' };
const internalError = (err) => ({ msg: 'internalError', err: err.name });

const usernameValidator = (string) => /^(?=.{6,20}$)([a-z0-9]+)$/.test(string);
const passwordValidator = (string) => /^(?=.{8,20}$)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)/.test(string);

const findUserDatabyUsername = async (username) => {
  const data = await User.findAll({ Where: { username } });
  return data[data.length - 1];
};

router
  .post('/signup', async (req, res) => {
    try {
      if (!req.body.username || !req.body.password
        || !usernameValidator(req.body.username)
        || !passwordValidator(req.body.password)) {
        res.status(400).send(badRequest);
        return;
      }
      await User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 5),
      });
      res.status(201).send({ msg: 'Successfully signed up' });
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send(alreadyExist);
      } else {
        res.status(500).send(internalError(err));
      }
    }
  })
  .use(cookieParser())
  .post('/login', async (req, res) => {
    try {
      console.log('here');
      if (await verifyToken(req.cookies.refresh_token, req.cookies.access_token)) {
        res.status(409).send(alreadyLoggedIn);
        return;
      }
      if (!req.body.username || !req.body.password
        || !usernameValidator(req.body.username) || !passwordValidator(req.body.password)) {
        res.status(400).send(badRequest);
        return;
      }
      const user = await findUserDatabyUsername(req.body.username);
      if (!user) {
        res.status(401).send(wrongInfo);
        return;
      }
      if (!bcrypt.compareSync(req.body.password,
        user.dataValues.password)) {
        res.status(400).send(badRequest);
        return;
      }
      const refresh = await issueRefreshToken(user.dataValues.id);
      const access = await issueAccessToken(user.dataValues.id);

      res
        .status(200)
        .cookie('access_token', access.token, { httpOnly: true, expires: new Date(access.exp) })
        .cookie('refresh_token', refresh.token, { httpOnly: true, expires: new Date(refresh.exp) })
        .send({ msg: 'successfully logged in' });
    } catch (err) {
      res.status(500).send(internalError(err));
    }
  })
  .post('/logout', async (req, res) => {
    try {
      const userId = await decodeToken(req, res);
      if (userId) {
        invalidateRefreshToken(req.cookies.refresh_token);
        invalidateAccessToken(userId);
        res.status(200).clearCookie().send({ msg: 'Successfully logged out' });
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'NotValidToken') {
        res.status(401).send({ msg: 'Not logged in' });
        return false;
      }
      res.status(500).send(internalError(err));
    }
    return false;
  })
  .get('/check', async (req, res) => {
    try {
      if (await decodeToken(req, res)) {
        res.status(200).send({ msg: 'The user is being logged in.' });
      }
    } catch (err) {
      res.status(500).send(internalError(err));
    }
  });

module.exports = router;

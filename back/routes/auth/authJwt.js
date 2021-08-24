const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const { secretKey } = require('../../config/config')[env];
const { User } = require('../../models/index');

const badRequest = { msg: 'Bad Request' }; // 400
const notLoggedIn = { msg: 'Not logged in' }; // 401
const refreshExpTime = 12 * 60 * 60; // sec
const accessExpTime = 30 * 60; // sec

const generateSuger = () => (`${Math.random().toString(36)} + '00000000000000000'`).slice(2, 10);

const whiteList = {};

const issueRefreshToken = async (id) => {
  const exp = Date.now() + refreshExpTime * 1000;
  const token = await jwt.sign({ id, exp }, secretKey);
  const data = await User.findAll({ Where: { id } });
  const user = data[data.length - 1];
  user.refreshToken = token;
  await user.save();
  return { token, exp };
};

const issueAccessToken = async (id) => {
  whiteList[`${id}`] = generateSuger();
  const exp = Date.now() + accessExpTime * 1000;
  const token = await jwt.sign({ id, sugar: whiteList[`${id}`], exp }, secretKey);
  return { token, exp };
};

const decodeToken = async (req, res, next) => {
  if (!req.cookies || !req.cookies.access_token || !req.cookies.access_token) {
    res.status(400).send(badRequest);
    return false;
  }
  const refreshPayload = await jwt.verify(req.cookies.refresh_token, secretKey);
  const accessPayload = await jwt.verify(req.cookies.access_token, secretKey);
  if (refreshPayload === null) {
    if (accessPayload === null) {
      res.status(401).send(notLoggedIn);
    } else {
      if (!whiteList[accessPayload.id] !== accessPayload.sugar) {
        res.status(401).send(notLoggedIn);
        return false;
      }
      const refresh = await issueRefreshToken(accessPayload.id);
      res.cookie('refresh_token', refresh.token, { httpOnly: true, expires: new Date(refresh.exp) });
      req.id = accessPayload.id;
      if (next) next();
      return { id: req.id };
    }
  } else if (accessPayload === null) {
    const access = await issueAccessToken(refreshPayload.id);
    res.cookie('access_token', access.token, { httpOnly: true, expires: new Date(access.exp) });
    req.id = accessPayload.id;
    if (next) next();
    return { id: req.id };
  } else {
    if (accessPayload.id !== refreshPayload.id || whiteList[`${accessPayload.id}`] !== accessPayload.sugar) {
      res.status(401).send(notLoggedIn);
      return false;
    }
    req.id = accessPayload.id;
    if (next) next();
    return { id: req.id };
  }
  return false;
};

const verifyToken = async (refreshToken, accessToken) => {
  try {
    if (!refreshToken && !accessToken) {
      return false;
    }
    await jwt.verify(refreshToken, secretKey);
    const accessPayload = await jwt.verify(accessToken, secretKey);
    const data = await User.findAll({ Where: { id: accessPayload.id } });
    const user = data[data.length - 1];
    if (whiteList[`${accessPayload.id}`] || user.refreshToken === refreshToken) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const invalidateRefreshToken = async (token) => {
  const payload = await jwt.verify(token, secretKey);
  if (payload === null) throw (new Error('NotValidToken'));
  const data = await User.findAll({ Where: { id: payload.id } });
  const user = data[data.length - 1];
  user.refreshToken = null;
  await user.save();
};

const invalidateAccessToken = (id) => {
  delete whiteList[`${id}`];
};

module.exports.decodeToken = decodeToken;
module.exports.invalidateRefreshToken = invalidateRefreshToken;
module.exports.invalidateAccessToken = invalidateAccessToken;
module.exports.issueRefreshToken = issueRefreshToken;
module.exports.issueAccessToken = issueAccessToken;
module.exports.verifyToken = verifyToken;

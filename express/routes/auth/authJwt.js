const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const { secretKey, expiresIn } = require('../../config/config')[env];

const badRequest = { msg: 'Bad Request' }; // 400
const notloggedIn = { msg: 'Not logged in' }; // 401
const expTime = parseInt(expiresIn, 10);

const generateSuger = () => (`${Math.random().toString(36)} + '00000000000000000'`).slice(2, 10);

const whiteList = {};

const decodeToken = async (req, res, next) => new Promise((resolve, reject) => {
  if (!req.cookies || !req.cookies.jwt_token) {
    res.status(400).send(badRequest);
    return false;
  }
  jwt.verify(req.cookies.jwt_token, secretKey,
    (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  return false;
})
  .then((payload) => {
    if (!whiteList[`${payload.id}`]) {
      res.status(403).send(notloggedIn);
      return false;
    }
    if (!next) {
      return `${payload.id}`;
    }
    req.id = payload.id;
    next();
    return false;
  })
  .catch((err) => {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send(notloggedIn);
      return false;
    }
    res.status(401).send(notloggedIn);
    return false;
  });

const verifyToken = async (token) => {
  try {
    if (!token) {
      return false;
    }
    const payload = await jwt.verify(token, secretKey);
    if (whiteList[payload.id]) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

const issueToken = (id) => new Promise((resolve, reject) => {
  whiteList[`${id}`] = generateSuger();
  const exp = Date.now() + expTime * 1000;
  jwt.sign({ id, sugar: whiteList[`${id}`], exp }, secretKey,
    (err, token) => {
      if (err) reject(err);
      else resolve({ token, exp });
    });
});

const invalidateToken = (id) => {
  delete whiteList[`${id}`];
};

module.exports.decodeToken = decodeToken;
module.exports.invalidateToken = invalidateToken;
module.exports.issueToken = issueToken;
module.exports.verifyToken = verifyToken;

const { User } = require("./../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var expiredToken = [];

const verify = {
  username: (username) => {
    if (/^[0-9a-z]*$/.test(username) && username.length >= 6) return true;
    return false;
  },
  password: (password) => {
    if (
      /^[0-9a-zA-Z]*$/.test(password) &&
      /[0-9]/.test(password) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      password.length >= 8
    )
      return true;
    return false;
  },
  email: (email) => {
    if (
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
        email
      )
    )
      return true;
    return false;
  },
  error: (err, msg) => {
    return JSON.stringify({
      error: err,
      message: msg,
    });
  },
};

const expiredTokenRefresh = () => {
  const now = parseInt(Date.now() / 1000);
  expiredToken = expiredToken.filter((token) => {
    return token.exp >= now;
  });
};

const isExpiredToken = (token) => {
  if (expiredToken.map((token) => token.token).indexOf(token) !== -1) {
    return true;
  }
  return false;
};

const tokenToUser = (token) => {
  var ret;
  if (expiredToken.map((token) => token.token).indexOf(token) !== -1) {
    return null;
  }
  try {
    ret = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (e) {
    console.log(e);
    ret = null;
  }
  return ret;
};

const jwtGuards = async (request, response, next) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!request.cookies.token) {
    response.status(400).send(verify.error(10, "cookie is undefined"));
    return;
  }
  if (isExpiredToken(request.cookies.token)) {
    response.status(400).send(verify.error(11, "expired token"));
    return;
  }
  var c;
  if ((c = tokenToUser(request.cookies.token))) {
    request.user = (
      await User.findOne({
        where: { username: c.username },
      })
    ).dataValues;
    next();
    return;
  }
  var user = await User.findOne({ where: { token: request.cookies.token } });
  if (user) {
    try {
      jwt.verify(user.dataValues.refreshToken, process.env.JWT_SECRET_KEY);
    } catch (e) {
      console.log(e);
      response.status(401).send(verify.error(15, "login is request"));
      return;
    }
    var tokenNew = jwt.sign(
      {
        username: user.dataValues.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: "userToken",
        expiresIn: process.env.JWT_TOKEN_EXPIRED,
      }
    );
    try {
      await User.update(
        {
          token: tokenNew,
        },
        {
          where: { token: request.cookies.token },
        }
      );
    } catch (e) {
      response.status(500).send(verify.error(5, "query error occured"));
      console.log(e);
    }
    console.log(`----------------- ${tokenNew}`);
    response.cookie("token", tokenNew, {
      expires: new Date(
        Date.now() + 1000 * 60 * process.env.JWT_TOKEN_COOKIE_EXPIRED
      ),
    });
    request.cookies.token = tokenNew;
    request.user = user.dataValues;
    next();
    return;
  }
  response.status(400).send(verify.error(10, "bad request"));
  return;
};

const signUp = async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!request.body.username || !request.body.email || !request.body.password) {
    response.status(400).send(verify.error(1, "field is undefined"));
    return;
  }
  if (
    !verify.username(request.body.username) ||
    !verify.password(request.body.password) ||
    !verify.email(request.body.email)
  ) {
    response.status(400).send(verify.error(2, "field is invalid"));
    return;
  }
  if (await User.findOne({ where: { username: request.body.username } })) {
    response.status(409).send(verify.error(3, "username already exist"));
    return;
  }
  if (await User.findOne({ where: { email: request.body.email } })) {
    response.status(409).send(verify.error(4, "email already exist"));
    return;
  }
  try {
    const passwordHash = bcrypt.hashSync(request.body.password, 6);
    await User.create({
      username: request.body.username,
      email: request.body.email,
      password: passwordHash,
    });
    response.status(200).send(
      JSON.stringify({
        message: "sucessfully signed up",
      })
    );
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
  }
};

const signIn = async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  expiredTokenRefresh();
  if (!request.body.email || !request.body.password) {
    response.status(400).send(verify.error(1, "field is undefined"));
    return;
  }
  var user = await User.findOne({ where: { email: request.body.email } });
  if (
    !user ||
    !bcrypt.compareSync(request.body.password, user.dataValues.password)
  ) {
    response.status(400).send(verify.error(6, "incorrect name or password"));
    return;
  }
  if (user.dataValues.token) {
    expiredToken.push({
      token: user.dataValues.token,
      exp:
        parseInt(Date.now() / 1000) +
        60 * process.env.JWT_TOKEN_EXPIRED_INTEGER,
    });
  }
  var refreshToken = jwt.sign({}, process.env.JWT_SECRET_KEY, {
    subject: "refresh",
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED,
  });
  var token = jwt.sign(
    {
      username: user.dataValues.username,
    },
    process.env.JWT_SECRET_KEY,
    {
      subject: "userToken",
      expiresIn: process.env.JWT_TOKEN_EXPIRED,
    }
  );
  await User.update(
    {
      token: token,
      refreshToken: refreshToken,
    },
    {
      where: { id: user.dataValues.id },
    }
  );
  response.cookie("token", token, {
    expires: new Date(
      Date.now() + 1000 * 60 * process.env.JWT_TOKEN_COOKIE_EXPIRED
    ),
  });
  response.status(200).send(
    JSON.stringify({
      message: "successfully loged in",
    })
  );
};

const signOut = async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  expiredTokenRefresh();
  if (!request.cookies.token) {
    response.status(400).send(verify.error(10, "cookie is undefined"));
    return;
  }
  try {
    var token = jwt.verify(request.cookies.token, process.env.JWT_SECRET_KEY);
    expiredToken.push({
      token: request.cookies.token,
      exp: token.exp,
    });
    await User.update(
      {
        token: null,
        refreshToken: null,
      },
      {
        where: { username: token.username },
      }
    );
    response.clearCookie("token");
    response.status(200).send(
      JSON.stringify({
        message: "successfully signed out",
      })
    );
  } catch (e) {
    console.log(e);
    response.status(400).send(verify.error(10, "bad request"));
  }
};

module.exports = { jwtGuards, tokenToUser, verify, signUp, signIn, signOut };

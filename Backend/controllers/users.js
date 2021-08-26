require('dotenv').config();
const passport = require('passport');
const jwt = require('../jwt-util/jwt-utils');
const redisClient = require('../lib/redis');
const { User } = require('../models')
const tokenkey = process.env.TOKEN_KEY;

const signup = async function (req, res) {
  console.log("요청감지")
  const { name, email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.status(400).json({
        result: false,
        message: "이미 계정이 있습니다"
      });
    }
    else {
      await User.create({ name, email, password });
      res.status(200).json({
        result: true,
        message: "회원가입 되었습니다."
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(400).json({
      result: false,
      message: `오류가 발생했습니다 (${error.message})`
    });
  }
}

const login = function (req, res) {
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate('local', (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError || !user) {
        console.log(passportError);
        res.status(400).json({ message: info.message });
        return;
      }
      // user데이터를 통해 로그인 진
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }
        const accessToken = jwt.access_sign(user)
        const refreshToken = jwt.refresh_sign();
        redisClient.set(user.id, refreshToken); // 발급한 refresh token을 redis에 key를 user의 id로 하여 저장합니다.
        res.cookie('access', accessToken,{
          maxAge: 300000 * 1000000,
          httpOnly :true
        });
        res.status(200).json({
          user: user,
          refreshToken : refreshToken
        })
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const profile = async function (req, res) {
  const id = req.id;
  console.log(req.id);
  try {
    const profile = await User.findOne({ where: { id: id } })
    console.log(profile);
    res.json(profile);
  }
  catch (error) {
    res.status(404).json({
      message: '프로필이 없습니다.'
    })
  }
}

module.exports = {
  signup: signup,
  login: login,
  profile: profile
}
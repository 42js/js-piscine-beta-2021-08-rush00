require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('../models')
const tokenkey = process.env.TOKEN_KEY;

const signup = async function(req, res) {
    const {name,email,password} = req.body;
    try{
      const exUser = await User.findOne({where : {email}});
      if (exUser){
        res.status(400).json({
          result: false,
          message: "이미 계정이 있습니다"
        });
      }
      else
      {
        await  User.create({name,email,password});
        res.status(200).json({
          result:true,
          message: "회원가입 되었습니다."
        })
      }
    }
    catch(error)
    {
      console.log(error);
      res.status(400).json({
        result : false,
        message: `오류가 발생했습니다 (${error.message})`
      });
    }
}

const login =  function(req, res){
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
        jwt.sign({
          id: user.id
        },
          tokenkey,{
              expiresIn: '1h', //유통기간
              issuer: 'ji-park.admin',
              subject: 'user.login.info'
          },
          function(err, token) {
              console.log('로그인 성공', token)
              res.json({ token });
          }
        );
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
    signup : signup,
    login: login
}
const {User} = require('../models')

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

const login = async function(req, res){
  const {email, password} = req.body;
}

module.exports = {
    signup : signup,
    login: login
}
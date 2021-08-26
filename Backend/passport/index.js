const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const {User} = require('../models')

const passportConfig = { usernameField: 'email', passwordField: 'password' };

const passportVerify =  async (email, password, done) =>{
    try{
        const exUser = await User.findOne({where : { email }});
        if (exUser){
            console.log(password);
            const result = await bcrypt.compare(password, exUser.password);
            if (result){
                done(null, exUser);
            }
            else {
                done(null, false, {message : '비밀번호가 일치하지 않습니다'});
            }
        }
        else {
            done(null, false, {message : '가입되지 않은 회원입니다'});
        }
    }
    catch(error){
        console.error(error);
        done(error);
    }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
};
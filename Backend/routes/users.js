const express = require('express');
const cors = require('cors');
const router = express.Router();
const authicate_JWT = require('../middlewares/authJWT');
const UserController = require('../controllers/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',UserController.signup);

router.post('/login',UserController.login);

router.post('/profile',authicate_JWT,UserController.profile);


module.exports = router;

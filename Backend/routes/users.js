const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup',UserController.signup);
router.post('/login',function(req, res){
  const {email, password} = req.body;
})



module.exports = router;

'use strict';

const router = require('express').Router();
const accountController = require('./accountController.js')

router.post('/account/signup', accountController.userSignUp);
router.post('/account/signin', accountController.userSignIn);
router.get('/account/signout', accountController.userSignOut);

module.exports = router;

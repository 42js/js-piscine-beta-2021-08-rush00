const express = require("express");
const authService = require("./service.js");
const router = express.Router();

router.post(process.env.ENDPOINT_AUTH_SIGNUP, (request, response) => {
  authService.signUp(request, response);
});

router.post(process.env.ENDPOINT_AUTH_SIGNIN, (request, response) => {
  authService.signIn(request, response);
});

router.signOut = (request, response) => {
  authService.signOut(request, response);
};

router.jwtGuards = authService.jwtGuards;
module.exports = router;

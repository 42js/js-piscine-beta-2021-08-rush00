const express = require("express");
const router = express.Router();
const { verify } = require("./../auth/service.js");

router.get(process.env.ENDPOINT_PROFILE_ID, async (request, response) => {
  response.status(200).send(
    JSON.stringify({
      username: request.user.username,
      email: request.user.email,
      createdAt: request.user.createdAt,
    })
  );
  return;
});

module.exports = router;

const express = require("express");
const boardService = require("./service.js");
const router = express.Router();

router.get(process.env.ENDPOINT_BOARD_MAIN, (request, response) => {
  boardService.getPostList(request, response);
});

router.post(process.env.ENDPOINT_BOARD_MAIN, (request, response) => {
  boardService.newPost(request, response);
});

router.get(process.env.ENDPOINT_BOARD_POST, (request, response) => {
  boardService.getPost(request, response);
});

router.patch(process.env.ENDPOINT_BOARD_POST, (request, response) => {
  boardService.updatePost(request, response);
});

router.delete(process.env.ENDPOINT_BOARD_POST, (request, response) => {
  boardService.deletePost(request, response);
});

module.exports = router;

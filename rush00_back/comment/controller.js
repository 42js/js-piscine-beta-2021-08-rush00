const express = require("express");
const commentService = require("./service.js");
const router = express.Router();

router.get(process.env.ENDPOINT_COMMENT, (request, response) => {
  commentService.getComments(request, response);
});

router.post(process.env.ENDPOINT_COMMENT, (request, response) => {
  commentService.newComment(request, response);
});

router.delete(process.env.ENDPOINT_COMMENT_EDIT, (request, response) => {
  commentService.deleteComment(request, response);
});

router.patch(process.env.ENDPOINT_COMMENT_EDIT, (request, response) => {
  commentService.updateComment(request, response);
});

module.exports = router;

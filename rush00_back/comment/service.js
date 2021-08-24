const { Board, Comment } = require("./../models");
const { verify } = require("./../auth/service.js");

const getComments = async (request, response) => {
  const postId = parseInt(request.params.id);
  if (isNaN(postId)) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  try {
    const commentList = [];
    const comments = await Comment.findAll({
      include: {
        model: Board,
        where: { id: postId },
      },
    });
    comments.forEach((comment) => {
      commentList.push({
        id: comment.dataValues.id,
        author: comment.dataValues.author,
        content: comment.dataValues.content,
        createdAt: comment.dataValues.createdAt,
        updatedAt: comment.dataValues.updatedAt,
      });
    });
    response.status(200).send(JSON.stringify(commentList));
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
  }
};

const newComment = async (request, response) => {
  const postId = parseInt(request.params.id);
  if (isNaN(postId)) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  if (!request.body.content) {
    response.status(400).send(verify.error(1, "field is undefined"));
    return;
  }
  var post;
  try {
    post = await Board.findOne({
      where: {
        id: postId,
      },
    });
    if (!post) {
      response.status(404).send(verify.error(10, "not found"));
      return;
    }
    await Comment.create({
      postId: postId,
      author: request.user.username,
      content: request.body.content,
    });
    response.status(200).send(
      JSON.stringify({
        message: "successfully added",
      })
    );
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
  }
};

const updateComment = async (request, response) => {
  const commentId = parseInt(request.params.commentId);
  if (isNaN(commentId)) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  if (!request.body.content) {
    response.status(400).send(verify.error(1, "field is undefined"));
    return;
  }
  var comment;
  try {
    comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      response.status(404).send(verify.error(10, "not found"));
      return;
    }
    if (request.user.username !== comment.dataValues.author) {
      response.status(401).send(verify.error(13, "unauthorized request"));
      return;
    }
    await Comment.update(
      {
        content: request.body.content,
        updatedAt: Date.now(),
      },
      {
        where: { id: commentId },
      }
    );
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
    return;
  }
  response.status(200).send(
    JSON.stringify({
      message: "successfully updated",
    })
  );
};

const deleteComment = async (request, response) => {
  const commentId = parseInt(request.params.commentId);
  if (isNaN(commentId)) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  var comment;
  try {
    comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });
    if (!comment) {
      response.status(404).send(verify.error(10, "not found"));
      return;
    }
    if (request.user.username !== comment.dataValues.author) {
      response.status(401).send(verify.error(13, "unauthorized request"));
      return;
    }
    await Comment.destroy({
      where: { id: commentId },
    });
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
    return;
  }
  response.status(200).send(
    JSON.stringify({
      message: "successfully deleted",
    })
  );
};

module.exports = { getComments, newComment, updateComment, deleteComment };

const { Board } = require("./../models");
const { verify } = require("./../auth/service.js");

const getPostList = async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  const idx = parseInt(request.query.idx);
  if (isNaN(idx) || idx < 1) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  try {
    const posts = await Board.findAll({
      offset: idx - 1,
      limit: 5,
    });
    const titleList = [];
    posts.forEach((post) => {
      titleList.push({
        id: post.dataValues.id,
        author: post.dataValues.author,
        title: post.dataValues.title,
        createdAt: post.dataValues.createdAt,
        updatedAt: post.dataValues.updatedAt,
      });
    });
    response.status(200).send(
      JSON.stringify({
        rows: await Board.count(),
        posts: titleList,
      })
    );
  } catch (e) {
    response.status(500).send(verify.error(5, "query error occured"));
  }
};

const newPost = async (request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!request.body.title || !request.body.content) {
    response.status(400).send(verify.error(1, "field is undefined"));
    return;
  }
  try {
    await Board.create({
      author: request.user.username,
      title: request.body.title,
      content: request.body.content,
    });
    response.status(200).send(
      JSON.stringify({
        message: "successfully wrote a post",
      })
    );
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
  }
};

const getPost = async (request, response) => {
  const postId = parseInt(request.params.id);
  if (isNaN(postId)) {
    response.status(400).send(verify.error(10, "bad request"));
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
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
    return;
  }
  response.status(200).send(JSON.stringify(post.dataValues));
};

const updatePost = async (request, response) => {
  const postId = parseInt(request.params.id);
  if (isNaN(postId)) {
    response.status(400).send(verify.error(10, "bad request"));
    return;
  }
  if (!request.body.title || !request.body.content) {
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
  } catch (e) {
    console.log(e);
    response.status(500).send(verify.error(5, "query error occured"));
    return;
  }
  if (request.user.username !== post.dataValues.author) {
    response.status(401).send(verify.error(13, "unauthorized request"));
    return;
  }
  await Board.update(
    {
      title: request.body.title,
      content: request.body.content,
      updatedAt: Date.now(),
    },
    {
      where: { id: postId },
    }
  );
  response.status(200).send(
    JSON.stringify({
      message: "successfully edited",
    })
  );
};

const deletePost = async (request, response) => {
  const postId = parseInt(request.params.id);
  if (isNaN(postId)) {
    response.status(400).send(verify.error(10, "bad request"));
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
    if (request.user.username !== post.dataValues.author) {
      response.status(401).send(verify.error(13, "unauthorized request"));
      return;
    }
    await Board.destroy({
      where: { id: postId },
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

module.exports = { getPostList, newPost, getPost, updatePost, deletePost };

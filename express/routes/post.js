const express = require('express');
const cookieParser = require('cookie-parser');
const { decodeToken } = require('./auth/authJwt');
const { User, Post } = require('../models/index');

const router = express.Router();
// const replyRouter = require('./reply');

// const badRequest = { msg: 'Bad Request' };
const wrongApproach = { msg: 'Wrong approach' };

const isNonNegativeInt = (number) => {
  if (!number || Number.isNaN(number) || !Number.isInteger(parseFloat(number))) {
    return false;
  }
  if (parseInt(number, 10) < 0) {
    return false;
  }
  return true;
};

const userIdToUserName = async (userId) => {
  const users = await User.findAll({ where: { id: userId } });
  return users[users.length - 1].dataValues.username;
};

router
  .use(cookieParser())
  .use(decodeToken)
  // writing
  .post('', async (req, res) => {
    try {
      if (!req.body.title) {
        res.status(400).send({ msg: 'Bad request' });
      }
      const username = await userIdToUserName(req.id);
      const post = await Post.create({
        username,
        title: req.body.title,
        content: req.body.content,
        userId: req.id,
      });
      res.status(201).send({ msg: 'Successfully posted', data: { postId: post.id } });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });
    }
  })
  // searching
  .get('', (req, res) => {
    const { user, number } = req.query;
    if (!isNonNegativeInt(number)) {
      res.status(400).send({ msg: 'Bad request' });
    }
    const condition = { limit: parseInt(number, 10), order: [['createdAt', 'DESC']] };
    if (user) {
      condition.where = { username: user };
    }
    Post.findAll(condition)
      .then((posts) => {
        res.status(200).send({
          msg: 'Successfully fetched',
          posts,
        });
      }).catch((err) => {
        res.status(500).send({ msg: err.message });
      });
  })
  // deleting
  .delete('', async (req, res) => {
    try {
      const postId = req.query.post_id;
      if (!isNonNegativeInt(postId)) {
        res.status(400).send({ msg: 'Bad request' });
      }
      const posts = await Post.findAll({ where: { id: postId } });
      if (posts.length === 0) {
        res.status(409).send({ msg: 'Not a valid id' });
      } else if (posts[0].dataValues.userId !== req.jwtPayload.id) {
        res.status(403).send({ msg: 'Not a valid user' });
      } else {
        posts[0].destroy();
        res.status(200).send({ msg: 'Post is successfully deleted' });
      }
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  })
  .put('', async (req, res) => {
    try {
      const postId = req.query.post_id;
      if (!postId) {
        res.status(400).send({ msg: 'Bad request' });
        return;
      }
      const { title, content } = req.body;
      if (!isNonNegativeInt(postId)) {
        res.status(400).send({ msg: 'Bad request' });
      }
      const posts = await Post.findAll({ where: { id: postId } });
      if (posts.length === 0) {
        res.status(409).send({ msg: 'Not a valid id' });
      } else if (posts[0].dataValues.userId !== req.id) {
        res.status(403).send({ msg: 'Not a valid user' });
      } else {
        const post = posts[0];
        if (title) post.title = title;
        if (content) post.content = content;
        post.save();
        res.status(200).send({ msg: 'Post is successfully edited' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });
    }
  });
// .use('*', replyRouter);

module.exports = router;

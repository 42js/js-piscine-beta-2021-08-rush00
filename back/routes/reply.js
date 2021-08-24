const express = require('express');
const cookieParser = require('cookie-parser');
const { decodeToken } = require('./auth/authJwt');
require('dotenv').config();
const { User, Post, Reply } = require('../models/index');

const router = express.Router();

const badRequest = { msg: 'Bad Request' };
const conflict = { msg: 'Not a valid id' };

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

const postExist = async (postId) => {
  const posts = await Post.findAll({ where: { id: postId } });
  return (posts.length !== 0);
};

router
  .use(cookieParser())
  .use(decodeToken)
  .post('', async (req, res) => {
    try {
      if (!isNonNegativeInt(req.query.post_id)) {
        res.status(400).send(badRequest);
        return;
      }
      if (!await postExist(req.query.post_id || !req.body.content)) {
        res.status(409).send(conflict);
      } else {
        const username = await userIdToUserName(req.id);
        if (!username) {
          res.status(409).send(conflict);
        }
        console.log(req.body.content);
        const reply = await Reply.create({
          username,
          content: req.body.content,
          userId: req.id,
          postId: req.query.post_id,
        });
        res.status(201).send({ msg: 'Successfuly replied', data: { replyId: reply.id } });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  })
  .delete('', async (req, res) => {
    try {
      if (!isNonNegativeInt(req.query.reply_id)) {
        res.status(400).send(badRequest);
        return;
      }
      const data = Reply.findAll({ where: { id: req.query.reply_id } });
      if (data.length === 0) {
        res.status(409).send(conflict);
        return;
      }
      data[data.length - 1].destroy();
      res.status(200).send({ msg: 'Successfully deleted' });
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  })
  .put('', async (req, res) => {
    try {
      if (!isNonNegativeInt(req.query.reply_id) || req.body.content) {
        res.status(400).send(badRequest);
        return;
      }
      const data = Reply.findAll({ where: { id: req.query.reply_id } });
      if (data.length === 0) {
        res.status(409).send(conflict);
        return;
      }
      const reply = data[data.length - 1];
      reply.content = req.body.content;
      await reply.save();
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  })
  .get('', async (req, res) => {
    try {
      if (!isNonNegativeInt(req.query.post_id) || !isNonNegativeInt(req.query.post_id)) {
        res.status(400).send(badRequest);
        return;
      }
      const data = await Reply.findAll({
        limit: parseInt(req.query.number, 10),
        order: [['createdAt', 'DESC']],
        where: { postId: req.query.post_id },
      });
      console.log(data);
      res.status(200).send({ msg: 'Successfully fetched', data });
    } catch (err) {
      res.status(500).send({ msg: err });
    }
  });

module.exports = router;

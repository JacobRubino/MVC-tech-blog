const router = require('express').Router();
const { Comment } = require('../../models');
const Auth = require('../../utils/auth');
const Filter = require('bad-words');
const filter = new Filter();

router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', Auth, async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.create({
        comment_text: filter.clean(req.body.comment_text),
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });

      res.json(dbCommentData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.expo
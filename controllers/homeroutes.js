const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const { format_date } = require('../utils/helpers');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage', {
    layout: 'main', 
    logged_in: req.session.logged_in,
    format_date,
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    layout: 'main',
    logged_in: req.session.logged_in,
    format_date,
  });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
      format_date,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
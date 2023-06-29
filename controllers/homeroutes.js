const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const Auth = require('../utils/auth');

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

router.get('/dashboard', Auth, async (req, res) => {
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
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   res.render('signup');
// });
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     const newUser = await User.create({
//       username,
//       email,
//       password,
//     });

//     res.status(200).json({ message: 'Signup successful' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


module.exports = router;
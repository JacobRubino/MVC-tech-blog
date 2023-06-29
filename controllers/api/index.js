const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');
const signupRoutes = require('./signuproutes');

// router.use('/users', userRoutes);
router.use('/dashboard', postRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
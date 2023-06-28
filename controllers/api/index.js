const router = require('express').Router();
const userRoutes = require('./userroutes');
const postRoutes = require('./postroutes');

router.use('/users', userRoutes);
router.use('/dashboard', postRoutes);

module.exports = router;
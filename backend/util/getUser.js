const router = require("express").Router();
const User = require("../models/Users");
const authenticateToken = require('./authMiddleware');

router.get('/user', (req, res) => {
    const token = req.cookies.token;
    res.json(token);
  });

  module.exports = router

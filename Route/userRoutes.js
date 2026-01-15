const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getMe 
} = require('../Controller/userController');

const { verifyToken } = require('../Middlewares/authMiddleware'); 

router.post('/signup', registerUser);

router.post('/signin', loginUser);

router.get('/me', verifyToken, getMe);

module.exports = router;
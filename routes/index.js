const express = require('express');
const {signIn, signUp, signUpPage, signInPage, logOut} = require('../controller/user_controller');
const router = express.Router();

// routes 
router.get('/', signUpPage)
router.post('/createUser', signUp);

router.get('/signin', signInPage);
router.post('/signinUser', signIn);
router.get('/logout', logOut);

router.use('/', require('./habits'));


module.exports = router;
var express = require('express');
var router = express.Router();
import {ROLE_APP_USER, ROLE_ADMIN} from '../const'
import User from '../models/userModel'
import asyncMiddleware from 'express-async-handler'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '../config'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("request.user ", req.user)
  var token = jwt.sign({id:req.user.id, username:req.user.username}, config.get('auth.passportSecret'), {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({ auth: true, token: token });
});


router.post('/register', asyncMiddleware(async (req, res) => {
  let user = await User.register(new User({ username : req.body.email, name:req.body.name, email:req.body.email, roles:[ROLE_APP_USER] }), req.body.password);
  res.json(user)
}));


module.exports = router;

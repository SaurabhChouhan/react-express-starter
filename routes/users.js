import express from 'express'
import {ROLE_APP_USER, ROLE_ADMIN} from '../const'
import User from '../models/userModel'
import asyncMiddleware from 'express-async-handler'

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', asyncMiddleware(async (req, res) => {
  let user = await User.register(new User({ username : req.body.email, name:req.body.name, email:req.body.email, roles:[ROLE_APP_USER] }), req.body.password);
  res.json(user)
}));

module.exports = router;
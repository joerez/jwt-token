const express = require('express');
const app = express();
const User = require('../models/User');

var jwt = require('jsonwebtoken');


module.exports = (app) => {

  app.get('/sign-up', (req, res) => {
    res.render('sign-up')
  })

  app.post('/sign-up', (req, res) => {
    let user = new User(req.body);
    console.log(user)
    user.save(function(err) {
      if (err) console.log(err)
      let token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');

    })
  })

  app.get('/banannas', (req, res) => {
    res.send('secure?');
  })

} //Modules.exports

'use strict';

const express = require('express');
const { model } = require('mongoose');
const Users = require('./models/users-model.js');
const base64 = require('base-64');
const superagent = require('superagent');
const router = express.Router();

//basic auth routes

router.post('/signup', (req, res, next) => {

  //expecting username and password to come form our req.body
  const username = req.body.username;
  const password = req.body.password;

  //create a user and encrypt the password
  const Newuser = new Users({
    username,
    password
  });

  //need to encrypt the password
  Newuser.save()
  .then(async user => {
    //Create a token using some user data and sent it back
    const token = await user.generateToken();
    res.send(token);
  })

})

router.post('/signin', (req, res, next) => {

//Basic

const encodedString = req.headers.authorization.split(':');
const decodedString = base64.decode(encodedString);

const [user, pass] = decodedString.split(':'); // [username, password]

//find a user that has the username
Users.findOne({ username: user})
.then(async user => {
  let validUser = await.user.comparePasswords(pass);
  if(validUser){
    let token = await user.generateToken();
    res.send(token);
  }
});

});

router.get('/oauth', async (res, req, next) => {

  let code = req.query.code; // oauth gives us a code to make a request for the token

  let tokenURL = 'https://github.com/login/oauth/access_token';
  let remoteUserURL = 'https://api.github.com/user';

  try{

    //step 3 first exchange an access code for an access token
    const access_token = await exchangeCodeForToken(code);

    //step 4 npw that we have the token, we can use this to get data about the user
    const userData = await getRemoteUserData(access_token);

    //step 5 using our userData from the auth provider, we can create our own user to relate to any resources this user creates
    //the goal here is to send back a token from this  user we created
    const token = await createAPIUser(userData);

    res.send(token);
  } catch(e){
    console.log(e);

    res.status(400).send('Something went wrong');
  }

  //confirm that a request was made and get a token for user data
  async function exchangeCodeForToken(code){
    let tokenRequest = await superagent.post(tokenURL)
    .send({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    let access_token = tokenRequest.body.access_token;
    return access_token;

  }

  //use the access_token to request information about the user
  async function getRemoteUserData(token){
    console.log('token from code', token);
    let userRequest = await superagent.get(remoteUserURL)
      .set('User-Agent', 'express') //specific to githubs requirement for requesting data
      .set('Authorization',  `token ${token}`);

      let user = userRequest.body;

      return user;
  }

  //this creates our own user and creates a token
  async function createAPIUser(userdata){
    const newUser = new Users({ username:userdata.login });
    const savedUser = await newUser.save();
    const token = savedUser.generateToken();
    return token;
  }

});

module.exports = router;
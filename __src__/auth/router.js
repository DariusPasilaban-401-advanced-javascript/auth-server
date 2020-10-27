'use strict';

const express = require('express');

const app = express();

app.post('/signup', (req, res, next) => {

  //this is unique to this route
  const userCreds = req.body;
  //userCreds.username
  //userCreds.password
  UserStorage.save()
  .then( () => {
    const token = UserStorage.generateToken(userCreds.username);

    //once we generate this, we send this to our client for any subsequent requests
    res.send(token);
  })

})

const UserStorage = {};

//Method for saving a new user
UserStorage.save = async function(username, password){

  const hashedPassword = await bcrypt.hash(password, 10); //params: string to encrypt / salt: the number of times we run our input

  //we have a big long string that is considered secure
  console.log(hashedPassword);

  this[username] = {
    username: username,
    password: hashedPassword,
  }
}

//method for creating a JWT
UserStorage.generateToken = function(username){
  let token = jwt.sign()
}

app.post('/signin', (req, res, next) => {

})

app.get('/oauth', (req, res, next) => {
  
})
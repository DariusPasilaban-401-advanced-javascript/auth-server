const userModel = require('./users-model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UsersCollection{

  constructor(){
    this.model = userModel;
  }

  create(user){

  }


  read(){

  }


  update(){

  }


  delete(){

  }
}

module.exports = UsersCollection;
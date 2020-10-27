'use strict';

const express = require('express');

const app = express();

const mongoose = require('mongoose')

//connect to mongodb class-11-db, if it doens't exist create then connect to it
mongoose.connect('mongodb://localhost/class11');

//checks proof of life
mongoose.connection.once('open', function(){
  console.log('Connected to mongodb');
})
//this is for error catching verification
.on('error', function(error){
  console.log('Connection error', error);
})

module.exports = app;
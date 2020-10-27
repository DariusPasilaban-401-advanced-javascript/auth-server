'use strict';

const express = require('express');

const app = express();

app.post('/signin', basicAuthentication, (req, res) => {
  
})
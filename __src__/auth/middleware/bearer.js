'use strict';

const express = require('express');

const app = express();

app.get('/secretstuff', tokenAuthentication, (req, res) => {
  
})
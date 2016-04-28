const mongoose = require('mongoose');
const express = require('express');
const restify = require('express-restify-mongoose');

const router = express.Router();


const models = require('../../mongo/')

for (var model in mongoose.models) {
  restify.serve(router, mongoose.models[model]);
}

module.exports = router;

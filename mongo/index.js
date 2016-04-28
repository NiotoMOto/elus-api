const requireDir = require('require-dir');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/database');
module.exports = requireDir('./schemas');

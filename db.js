const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

const db = mongoose.connect(connectionString);

module.exports = { db };

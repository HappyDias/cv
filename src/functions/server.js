// server.js
import mongoose from 'mongoose'
const dotenv = require('dotenv').config()// Initialize connection to database

const dbUrl = process.env.MONGO_STR,
      dbOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        dbName: 'cv_adias'
      }// Set DB from mongoose connection

mongoose.connect(dbUrl, dbOptions);

const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default conn;
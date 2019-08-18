// server.js
import {MongoClient} from 'mongodb';

const dotenv = require('dotenv').config()// Initialize connection to database

const dbUrl = process.env.MONGO_STR,
      dbOptions = {
        useNewUrlParser: true,
      }

async function makeConnection(){
	var connection = null;
	try{
		connection = await MongoClient.connect(dbUrl, dbOptions);
	}
	catch(e){
		console.log("ERROR connecting to mongo", e);
	}
	return connection;
}


export default makeConnection;
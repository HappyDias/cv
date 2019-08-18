// server.js
import {MongoClient} from 'mongodb';

const dotenv = require('dotenv').config()// Initialize connection to database

const dbUrl = process.env.MONGO_STR,
      dbOptions = {
        useNewUrlParser: true,
      }

class Connection {
    static connectToMongo() {
        if ( this.db ) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(db => this.db = db)
    }
}

Connection.db = null;
Connection.url = dbUrl;
Connection.options = dbOptions;

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


export default Connection;
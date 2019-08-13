import mongoose from "mongoose";
import conn from './server';

//Declares the variable schema with forcefully a date and a title
const Tab = conn.model('tabs', new mongoose.Schema({
  title: String,
  date: Number
},
{strict:false}));

export async function handler(event, context) {
  const response = {
    statusCode: 200,
    body: [],
    headers: {}
  };
  const title = event.queryStringParameters.title;

  console.log(event.queryStringParameters, event);

  if(!title){
    response.body = "No tab title provided";
    response.statusCode = 400;
    response.headers["Content-Type"] = "text/html";
    return response;
  }

  try{
    //Queries the distinct tab names in the database
    const query = await Tab.find({title}).sort({date: -1}).limit(1);
    var data = null;

    if(query.length > 0){
      data = query[0];
    }

    response.body = JSON.stringify(data);
    response.headers["Content-Type"] = "application/json";
  }
  catch(e){
    response.body = e.message;
    response.statusCode = 500;
    response.headers["Content-Type"] = "text/html";
  }

  return response;
}

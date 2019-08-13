import mongoose from "mongoose";
import conn from './server';

//Declares the variable schema with forcefully a date and a title
const Tab = conn.model('tabs', new mongoose.Schema({
  title: String,
  date: Number
},
{strict:false}));

const orders = {
  "Interests" : 0,
  "Education" : 1,
  "Experience" : 2,
  "Skills" : 3,
  "Language" : 4,
  "Publications" : 5,
}

function order(a,b){
  return orders[a] - orders[b];
}

export async function handler(event, context) {
  const response = {
    statusCode: 200,
    body: [],
    headers: {}
  };

  try{
    //Queries the distinct tab names in the database
    const query = await Tab.find().distinct('title');

    response.body = JSON.stringify(query.sort(order));
    response.headers["Content-Type"] = "application/json";
  }
  catch(e){
    response.body = e.message;
    response.statusCode = 500;
    response.headers["Content-Type"] = "text/html";
  }

  return response;
}

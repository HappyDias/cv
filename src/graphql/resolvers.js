import { GraphQLScalarType } from  'graphql';
import Connection from '../utils/server';
import {GraphqlError} from '../utils/errors';

const resolvers = {
  Query: {
    getTab: async (root, args, context) => {
      const {title} = args;

      const dbconn = await Connection.connectToMongo();
      const db = dbconn.db('cv_adias');
      const collection = db.collection('tabs');
      const titles = await collection.distinct('title');
      var query = null;

      if(titles.indexOf(title)>=0){
        query = await collection.findOne({title});
      }
      else{
      	throw new GraphqlError('Invalid title ' + title + ' must be one of: ' + titles.join(', '));
      }

      if(query) return query;
      return null;
    },
    tabList: async (root, args, context) => {

      const dbconn = await Connection.connectToMongo();
      const db = dbconn.db('cv_adias');
      const collection = db.collection('tabs');
      const query = await collection.distinct('title');

      if(query) return query;
      return null;
    }
  },
  Data: new GraphQLScalarType({
    name: "TabData",
    description: "Generic data object returned for each tab"
  })
};

export default resolvers
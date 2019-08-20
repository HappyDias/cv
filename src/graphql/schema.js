import {gql} from "apollo-server-lambda";
import {getTabTitles} from '../utils/functions';
import Connection from '../utils/server';

async function makeSchema(){
  const dbconn = await Connection.connectToMongo();
  const titles = await getTabTitles(dbconn);

  const schema = gql`
  scalar Data
  enum Title { ${titles.join(' ')} }
  type Tab {
    _id: String!
    data: Data
    date: Float!
    title: String!
  }
  type Info {
    _id: String!
    date: Float!
    data: Data
  }
  type Query {
    getTab( title: Title): Tab
    getInfo: [Info]
  }
`;

  return schema;
}

export {makeSchema};
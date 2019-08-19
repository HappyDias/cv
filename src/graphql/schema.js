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
  type Query {
    getTab( title: Title): Tab
  }
`;

  return schema;
}

export {makeSchema};
import {gql} from "apollo-server-lambda";

const schema = gql`
  scalar Data
  type Tab {
    _id: String!
    data: Data
    date: Float!
    title: String!
  }
  type Query {
    getTab( title: String): Tab
    tabList: [String]
    hello: String
  }
`;

export default schema;
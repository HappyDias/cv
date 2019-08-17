import {ApolloServer} from "apollo-server-lambda";
import schema from "../graphql/schema";
import resolvers from "../graphql/resolvers";

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true //Should consider this, some joker can just use up all my netlify functions with the playground
});

exports.handler = server.createHandler();
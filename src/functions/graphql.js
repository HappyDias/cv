import {ApolloServer} from "apollo-server-lambda";
import {typeDefs, makeSchema} from "../graphql/schema";
import resolvers from "../graphql/resolvers";

const runHandler = (request, context, handler) =>
  new Promise((resolve, reject) => {
  const callback = (error, body) => (error ? reject(error) : resolve(body))

  handler(context, request, callback)
})

const run = async (context, request) => {
  const schema = await makeSchema();
  // Async functions go here
  const server = new ApolloServer({
     typeDefs: schema,
     resolvers,
     introspection: true,
     playground: true
  })
  const handler = server.createHandler({
      cors: { credentials: true, origin: true }
   });
  
  const response = await runHandler(request, context, handler)

  return response
}

/*const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true //Should consider this, some joker can just use up all my netlify functions with the playground
});

exports.handler = server.createHandler();*/

exports.handler = run;
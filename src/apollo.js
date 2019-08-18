import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: ".netlify/functions/graphql",
});

// This declaration ensures that ALL requests are NOT cached
// This is problematic in the sense of lambda functions
// And also requires constant internet connection
// But ensures that only the most recent data is fetched
/*const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
}

client.defaultOptions = {...defaultOptions};*/

// This is a fancy hack clears cache every 60s
// Ensures that most recently stored data is fetched periodically
// However, also requires users to have continuous internet connection
/*window.setInterval(()=>{
  //Clearing is a dramatic solution, marking data as stale would be preferable
  client.cache.data.clear();
},60000);*/

export default client;
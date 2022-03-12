const client = require("graphql-request");
const { GraphQLClient } = client;

const endpoint = "https://api.yelp.com/v3/graphql";

const graphQLCLient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
});

module.exports = graphQLCLient;
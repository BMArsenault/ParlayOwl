// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        gameCount: Int
        savedGames: [Game]
    }

    type Match {
        matchId: String
        sportTitle: String
        time: String
        homeTeam: String
        awayTeam: String
        bookmakers: String
        markets: Int
    }
    
    type Bar {
        businessId: String
        name: String
        image: String
        alias: String
        rating: String
        url: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBar(businessId: String!, name: String!, image: String!, alias: String!, rating: String, url: String): User
        removeBar(businessId: String!): User
    }
    type Auth {
        token: ID!
        user: User
    }
`;

// export the typeDefs
module.exports = typeDefs;
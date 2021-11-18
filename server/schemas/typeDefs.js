const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Drug {
    rxcui: Int
    name: String
    synonym: String
  }

  type User {
    _id: ID
    name: String
    email: String
    prescriptions: [Prescription]
  }

  type Auth {
    user: User
    token: ID
  }

  type Prescription {
    _id: ID
    rxcui: String
    name: String
    synonym: String
    perDay: Int
  }

  type Message {
    message: String
  }
  
  type Query {
    scriptSearch(name: String!): [Drug]
    user(_id: ID): [User]
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPrescription(name: String!, synonym: String!, rxcui: Int!, perDay: Int): User
    updatePrescription(_id: ID!, perDay: Int!): Prescription
    deletePrescription(_id: ID!): Prescription
    nuke: Message
  }
`;

module.exports = typeDefs;

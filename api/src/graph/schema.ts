import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    channels: [Channel!]!
    channel(id: ID!): Channel!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(content: String!): Message!
    createChannel(name: String!): Channel!
  }

  type Subscription {
    messageCreated(channelID: ID!): Message!
  }

  type User {
    id: ID!
    name: String!
    email: String!

    channels: [Channel!]!
  }

  type Channel {
    id: ID!
    name: String!
    createdAt: String!

    members: [ChannelMember!]!
    messages: [Message!]!
  }

  type ChannelMember {
    id: ID!
    joinedAt: String!

    user: User
    channel: Channel
  }

  type Message {
    id: ID!
    content: String!
    createdAt: String!

    sender: User!
    channel: Channel!
  }
`;

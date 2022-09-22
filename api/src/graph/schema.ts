import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    user(id: Int!): User
    channels: [Channel!]!
    channel(id: Int!): Channel!
    message(id: Int!): Message!
  }

  type Mutation {
    createMessage(content: String!): Message!
    createChannel(name: String!): Channel!
    addUserToChannel(channelId: Int!, userId: Int!): ChannelMember!
  }

  type Subscription {
    messageCreated(channelID: Int!): Message!
  }

  type User {
    id: Int!
    name: String!
    email: String!

    channels: [Channel!]!
  }

  type Channel {
    id: Int!
    name: String!
    createdAt: String!

    members: [ChannelMember!]!
    messages: [Message!]!
  }

  type ChannelMember {
    id: Int!
    joinedAt: String!

    user: User
    channel: Channel
  }

  type Message {
    id: Int!
    content: String!
    createdAt: String!

    sender: User!
    channel: Channel!
  }
`;

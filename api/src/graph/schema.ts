import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    publicProfile(userId: String!): PublicProfile!
    user: User!
  }

  type Mutation {
    createPrivateChannel(toUserId: String!): PrivateChannel!
    acceptPrivateChannel(privateChannelId: String!): PrivateChannel!
    createMessage(content: String!, privateChannelId: String!): Message!
  }

  type Subscription {
    messageCreated(channelID: Int!): Message!
  }

  type PublicProfile {
    id: String!
    name: String!
  }

  type User {
    id: String!
    name: String!
    email: String!

    privateChannels: [PrivateChannel!]!
  }

  type PrivateChannel {
    id: String!

    fromUser: User!
    toUser: User!

    isAccepted: Boolean!
    messages: [Message!]!
  }

  type Message {
    id: String!
    content: String!

    creator: User!
    privateChannel: PrivateChannel!

    createdAt: String!
  }
`;

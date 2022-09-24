import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    user: User!
    userProfile(userId: String!): UserProfile!
    allUserProfiles: [UserProfile!]!
    conversations: [Conversation!]!
    messages(conversationId: String!): [Message!]!
  }

  type Mutation {
    startConversation(otherUserId: String!): Conversation!
    sendMessage(conversationId: String!, content: String!): Message!
  }

  type Subscription {
    messageSent(conversationId: Int!): Message!
  }

  type UserProfile {
    id: String!
    name: String!
    avatarUrl: String
    company: String
    title: String
  }

  type User {
    id: String!
    name: String!
    email: String!
    avatarUrl: String
    company: String
    title: String
    conversations: [Conversation!]!
  }

  type Conversation {
    id: String!
    user1Id: String!
    user2Id: String!
    unreadCount: Int!
    messages: [Message!]!
  }

  type Message {
    id: String!
    content: String!
    createdAt: String!
    sender: UserProfile!
    conversation: Conversation!
  }
`;

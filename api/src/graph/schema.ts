import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    currentUser: User!
    userProfile(userId: String!): UserProfile!
    allUserProfiles: [UserProfile!]!
    conversations: [Conversation!]!
    conversation(id: String!): Conversation!
    messages(conversationId: String!): [Message!]!
  }

  type Mutation {
    startConversation(otherUserId: String!): Conversation!
    sendMessage(conversationId: String!, content: String!): Message!
  }

  type Subscription {
    messageCreated(conversationId: String!): Message!
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
    unreadCount: Int!
    otherUser: UserProfile!
    lastMessage: Message
  }

  type Message {
    id: String!
    content: String!
    createdAt: String!
    sender: UserProfile!
    conversation: Conversation!
  }
`;

import { gql, useMutation, useQuery } from "@apollo/client";

export interface Conversation {
  id: string;
  unreadCount: number;
  updatedAt: string;
  otherUser: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  lastMessage?: {
    id: string;
    content: string;
    createdAt: string;
  };
}

export interface Conversations {
  conversations: Conversation[];
}

export interface StartConversation {
  startConversation: Conversation;
}

export const START_CONVERSATION = gql`
  mutation StartConversation($otherUserId: String!) {
    startConversation(otherUserId: $otherUserId) {
      id
      unreadCount
    }
  }
`;

export const GET_CONVERSATIONS = gql`
  query GetConversations {
    conversations {
      id
      unreadCount
      updatedAt
      otherUser {
        id
        name
        avatarUrl
      }
      lastMessage {
        id
        content
        createdAt
      }
    }
  }
`;

// Fix me: update cache or refetch query
export function useStartConversation() {
  const [startConversation] =
    useMutation<StartConversation>(START_CONVERSATION);
  return startConversation;
}

export function useConversations() {
  const { data, loading, error } = useQuery<Conversations>(GET_CONVERSATIONS);

  return {
    data,
    loading,
    error,
  };
}

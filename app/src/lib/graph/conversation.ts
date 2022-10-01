import { gql, useMutation, useQuery } from "@apollo/client";

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
  const [startConversation] = useMutation(START_CONVERSATION);
  return startConversation;
}

export function useConversations() {
  const { data, loading, error } = useQuery(GET_CONVERSATIONS);

  return {
    data,
    loading,
    error,
  };
}

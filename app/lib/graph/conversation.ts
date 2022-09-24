import { gql, useMutation, useQuery } from "@apollo/client";

export function useStartConversation() {
  const START_CONVERSATION = gql`
    mutation StartConversation($otherUserId: String!) {
      startConversation(otherUserId: $otherUserId) {
        id
        unreadCount
      }
    }
  `;

  const [startConversation] = useMutation(START_CONVERSATION);
  return startConversation;
}

export function useConversations() {
  const GET_CONVERSATIONS = gql`
    query GetConversations {
      conversations {
        id
        unreadCount
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

  const { data, loading, error } = useQuery(GET_CONVERSATIONS);

  return {
    data,
    loading,
    error,
  };
}

import { gql, useQuery } from "@apollo/client";

export function useMessages(conversationId: string) {
  const GET_MESSAGES = gql`
    query GetMessages($conversationId: String!) {
      messages(conversationId: $conversationId) {
        id
        content
        createdAt
        sender {
          id
          name
          avatarUrl
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  return {
    data,
    loading,
    error,
  };
}

import { gql, useMutation, useQuery } from "@apollo/client";

import { GET_CONVERSATIONS } from "./conversation";

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

const SEND_MESSAGE = gql`
  mutation SendMessage($conversationId: String!, $content: String!) {
    sendMessage(conversationId: $conversationId, content: $content) {
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

export function useMessages(conversationId: string) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { conversationId },
  });

  return {
    data,
    loading,
    error,
  };
}

export function useSendMessage() {
  const [sendMessage] = useMutation(SEND_MESSAGE);
  return (conversationId: string, content: string) =>
    sendMessage({
      variables: { conversationId, content },
      update(cache, { data: { sendMessage } }) {
        const { messages } = cache.readQuery({
          query: GET_MESSAGES,
          variables: { conversationId },
        }) as any;
        cache.writeQuery({
          query: GET_MESSAGES,
          variables: { conversationId },
          data: { messages: messages.concat([sendMessage]) },
        });

        const { conversations } = cache.readQuery({
          query: GET_CONVERSATIONS,
        }) as any;

        cache.writeQuery({
          query: GET_CONVERSATIONS,
          data: {
            conversations: conversations.map((conversation: any) => {
              if (conversation.id === conversationId) {
                return {
                  ...conversation,
                  lastMessage: sendMessage,
                };
              }
              return conversation;
            }),
          },
        });
      },
    });
}

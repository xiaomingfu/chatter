import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

import { Conversations, GET_CONVERSATIONS } from "./conversation";
import { GET_CURRENT_USER, GetCurrentUser } from "./currentUser";

export interface Sender {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: Sender;
}

export interface Messages {
  messages: Message[];
}
export interface SendMessage {
  sendMessage: Message;
}

export interface MessageCreated {
  messageCreated: Message;
}

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

export const SubscribeToMessageCreated = gql`
  subscription MessageCreated($conversationId: String!) {
    messageCreated(conversationId: $conversationId) {
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
  const { data, loading, error } = useQuery<Messages>(GET_MESSAGES, {
    variables: { conversationId },
  });

  return {
    data,
    loading,
    error,
  };
}

export function useSendMessage() {
  const [sendMessage] = useMutation<SendMessage>(SEND_MESSAGE);

  return (conversationId: string, content: string) =>
    sendMessage({
      variables: { conversationId, content },
      update(cache, { data }) {
        if (!data) return;
        const message = data.sendMessage;

        // Update messages
        const messagesData = cache.readQuery<Messages>({
          query: GET_MESSAGES,
          variables: { conversationId },
        });
        if (messagesData) {
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: { conversationId },
            data: { messages: messagesData.messages.concat([message]) },
          });
        }

        // Update conversation
        const conversationsData = cache.readQuery<Conversations>({
          query: GET_CONVERSATIONS,
        });
        if (conversationsData) {
          cache.writeQuery({
            query: GET_CONVERSATIONS,
            data: {
              conversations: conversationsData.conversations.map(
                (conversation) => {
                  if (conversation.id === conversationId) {
                    return {
                      ...conversation,
                      updatedAt: message.createdAt,
                      lastMessage: message,
                    };
                  }
                  return conversation;
                }
              ),
            },
          });
        }
      },
    });
}

export function useMessageCreated(conversationId: string) {
  const { data, loading, error } = useSubscription<MessageCreated>(
    SubscribeToMessageCreated,
    {
      variables: { conversationId },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const messageCreatedData = subscriptionData.data;
        if (!messageCreatedData) return;
        const messge = messageCreatedData.messageCreated;

        // Update total unread count
        const currentUserData = client.readQuery<GetCurrentUser>({
          query: GET_CURRENT_USER,
        });
        if (currentUserData) {
          client.writeQuery({
            query: GET_CURRENT_USER,
            data: {
              currentUser: {
                ...currentUserData.currentUser,
                totalUnreadMessagesCnt:
                  currentUserData.currentUser.totalUnreadMessagesCnt + 1,
              },
            },
          });
        }

        // Update messages
        const messagesData = client.readQuery<Messages>({
          query: GET_MESSAGES,
          variables: { conversationId },
        });
        if (messagesData) {
          client.writeQuery({
            query: GET_MESSAGES,
            variables: { conversationId },
            data: { messages: messagesData.messages.concat([messge]) },
          });
        }

        // Update conversation
        const conversationsData = client.readQuery<Conversations>({
          query: GET_CONVERSATIONS,
        });
        if (conversationsData) {
          client.writeQuery({
            query: GET_CONVERSATIONS,
            data: {
              conversations: conversationsData.conversations.map(
                (conversation) => {
                  if (conversation.id === conversationId) {
                    return {
                      ...conversation,
                      unreadCount: conversation.unreadCount + 1,
                      lastMessage: messge,
                    };
                  }
                  return conversation;
                }
              ),
            },
          });
        }
      },
    }
  );

  return {
    data,
    loading,
    error,
  };
}

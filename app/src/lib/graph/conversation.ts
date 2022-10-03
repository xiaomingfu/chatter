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

export function useStartConversation() {
  const [startConversation] = useMutation<StartConversation>(
    START_CONVERSATION,
    {
      update(cache, { data }) {
        const onversationsData = cache.readQuery<Conversations>({
          query: GET_CONVERSATIONS,
        });
        if (data && onversationsData) {
          cache.writeQuery({
            query: GET_CONVERSATIONS,
            data: {
              conversations: [
                data.startConversation,
                ...onversationsData.conversations.filter(
                  (conversation) =>
                    conversation.id !== data.startConversation.id
                ),
              ],
            },
          });
        }
      },
    }
  );
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

import { gql, useMutation } from "@apollo/client";

const START_CONVERSATION = gql`
  mutation StartConversation($otherUserId: String!) {
    startConversation(otherUserId: $otherUserId) {
      id
      user1Id
      user2Id
      unreadCount
    }
  }
`;

export function useStartConversation() {
  const [startConversation] = useMutation(START_CONVERSATION);
  return startConversation;
}

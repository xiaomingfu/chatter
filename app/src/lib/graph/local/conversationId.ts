import { gql, makeVar, useQuery } from "@apollo/client";

import LocalStorageWrapper from "../../utils/localStorage";

export interface ConversationId {
  value: string;
}

const ls = new LocalStorageWrapper<string>("conversationId", "");

const initConversationId = () => {
  const value = ls.get();
  return {
    value,
  };
};

export const conversationIdVar = makeVar<ConversationId>(initConversationId());

const GetConversationId = gql`
  query GetConversationId {
    conversationId @client {
      value
    }
  }
`;

const useConversationId = (): {
  conversationId: string;
  setConversationId: (value: string) => void;
} => {
  const {
    data: { conversationId },
  } = useQuery(GetConversationId);

  return {
    conversationId: conversationId.value,
    setConversationId: (value: string) => {
      conversationIdVar({
        value,
      });

      ls.set(value);
    },
  };
};

export default useConversationId;

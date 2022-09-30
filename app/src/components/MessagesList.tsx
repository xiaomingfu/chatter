import { List } from "@mui/material";
import React from "react";

import { useMessageCreated, useMessages } from "../lib/graph/message";
import MessageCard from "./MessageCard";

interface MessagesListProps {
  conversationId: string;
}

function MessagesList({ conversationId }: MessagesListProps) {
  const { loading, error, data } = useMessages(conversationId);
  useMessageCreated(conversationId);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {data.messages.map((message: any) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </List>
  );
}

export default MessagesList;

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
        height: "calc(100vh - 220px)",
        overflowY: "scroll",
        padding: 2,
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {[...data.messages].reverse().map((message: any) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </List>
  );
}

export default MessagesList;

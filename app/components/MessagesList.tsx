import { List, ListItem } from "@mui/joy";
import { Divider } from "@mui/material";
import React from "react";

import { useMessages } from "../lib/graph/message";
import MessageCard from "./MessageCard";

interface MessagesListProps {
  conversationId: string;
}

function MessagesList({ conversationId }: MessagesListProps) {
  const { loading, error, data } = useMessages(conversationId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List>
      <Divider />
      {data.messages.map((message: any, index: number) => (
        <React.Fragment key={message.id}>
          <ListItem>
            <MessageCard message={message} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}

export default MessagesList;
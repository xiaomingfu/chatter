import { Divider, List, ListItem } from "@mui/material";
import React from "react";

import { useConversations } from "../lib/graph/conversation";
import ConversationCard from "./ConversationCard";

function ConversationsList() {
  const { loading, error, data } = useConversations();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const conversations = [...(data?.conversations || [])].sort(
    (a, b) => parseInt(b.updatedAt) - parseInt(a.updatedAt)
  );

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      {conversations.map((conversation, index) => (
        <React.Fragment key={conversation.id}>
          <ListItem disablePadding={true}>
            <ConversationCard conversation={conversation} />
          </ListItem>
          {data && index !== data.conversations.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default ConversationsList;

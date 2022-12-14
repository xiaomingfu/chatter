import { List } from "@mui/material";

import { useMessages } from "../lib/graph/message";
import MessageCard from "./MessageCard";

interface MessagesListProps {
  conversationId: string;
}

function MessagesList({ conversationId }: MessagesListProps) {
  const { error, data } = useMessages(conversationId);

  return (
    <List
      sx={{
        width: "100%",
        height: "calc(100vh - 220px)",
        minHeight: "calc(100vh - 220px)",
        overflowY: "scroll",
        padding: 2,
        scrollBehavior: "smooth",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {error && <p>Error :(</p>}
      {data &&
        [...data.messages]
          .reverse()
          .map((message) => <MessageCard key={message.id} message={message} />)}
    </List>
  );
}

export default MessagesList;

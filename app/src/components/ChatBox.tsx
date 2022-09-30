import SendIcon from "@mui/icons-material/Send";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";

import { useSendMessage } from "../lib/graph/message";

interface ChatBoxListProps {
  conversationId: string;
}

function ChatBox({ conversationId }: ChatBoxListProps) {
  const [message, setMessage] = React.useState("");
  const sendMessage = useSendMessage();

  const sendMessageHandler = () => {
    if (message) {
      sendMessage(conversationId, message);
      setMessage("");
    }
  };

  return (
    <Stack gap={1}>
      <TextField
        multiline
        rows={2}
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={sendMessageHandler}
      >
        Send
      </Button>
    </Stack>
  );
}

export default ChatBox;

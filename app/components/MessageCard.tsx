import { Avatar } from "@mui/joy";
import { Box } from "@mui/system";
import React from "react";

import { currentUserId } from "../lib/auth";

interface MessagesListProps {
  message: any;
}

function MessageCard({ message }: MessagesListProps) {
  const isOwnMessage = message.sender.id === currentUserId;

  return (
    <Box
      sx={{
        width: "100%",
        gap: 2,
        display: "flex",
        flexDirection: isOwnMessage ? "row" : "row-reverse",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>{message.content}</Box>
      <Avatar src={message.sender.avatarUrl} />
    </Box>
  );
}

export default MessageCard;

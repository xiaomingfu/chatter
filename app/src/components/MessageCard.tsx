import { Avatar, ListItem, Tooltip, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";

import { currentUserId } from "../lib/auth";

interface MessagesListProps {
  message: any;
}

function MessageCard({ message }: MessagesListProps) {
  const isOwnMessage = message.sender.id === currentUserId;

  return (
    <ListItem
      sx={{
        width: "100%",
        gap: 2,
        display: "flex",
        justifyContent: isOwnMessage ? "flex-end" : "flex-start",
        alignItems: "flex-start",
      }}
    >
      <Tooltip title={message.sender.name}>
        <Avatar
          src={message.sender.avatarUrl}
          sx={{ visibility: isOwnMessage ? "hidden" : "initial" }}
        />
      </Tooltip>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: isOwnMessage ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "80%",
            padding: 1,
            justifyContent: isOwnMessage ? "flex-end" : "flex-start",
            borderRadius: 1,
            border: (radius) =>
              `1px solid ${isOwnMessage ? blue[200] : grey[200]}`,
            backgroundColor: isOwnMessage ? blue[100] : grey[100],
          }}
        >
          <Typography fontSize={16} fontWeight="semibold" textOverflow={"clip"}>
            {message.content}
          </Typography>
        </Box>
      </Box>
      <Tooltip title={message.sender.name}>
        <Avatar
          src={message.sender.avatarUrl}
          sx={{ visibility: isOwnMessage ? "initial" : "hidden" }}
        />
      </Tooltip>
    </ListItem>
  );
}

export default MessageCard;

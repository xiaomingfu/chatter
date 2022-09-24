import { ListItemContent } from "@mui/joy";
import { Avatar, Badge, ListItemButton, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React from "react";

import { tsToAgo } from "../lib/utils/datetime";

interface ConversationCardProps {
  conversation: any;
}

function ConversationCard({ conversation }: ConversationCardProps) {
  const { otherUser, unreadCount, lastMessage } = conversation;
  return (
    <ListItemButton sx={{ gap: 2, padding: "2px" }}>
      <Badge color="success" badgeContent={unreadCount}>
        <Avatar
          sx={{ bgcolor: green[500] }}
          variant="rounded"
          src={otherUser.avatarUrl}
          alt={otherUser.name}
        />
      </Badge>
      <ListItemContent sx={{ textAlign: "end", overflow: "hidden" }}>
        <Typography
          noWrap
          fontSize={14}
          color={grey[600]}
          textOverflow={"clip"}
        >
          {lastMessage?.content}
        </Typography>
        <Typography fontSize={12} color={grey[500]}>
          {tsToAgo(lastMessage?.createdAt)}
        </Typography>
      </ListItemContent>
    </ListItemButton>
  );
}

export default ConversationCard;

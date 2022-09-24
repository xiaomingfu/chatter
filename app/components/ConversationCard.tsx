import React from "react";
import { ListItemButton, ListItemContent, Typography } from "@mui/joy";
import { tsToAgo } from "../lib/utils/datetime";
import { Avatar, Badge } from "@mui/material";
import { green } from "@mui/material/colors";

interface ConversationCardProps {
  conversation: any;
}

function ConversationCard({ conversation }: ConversationCardProps) {
  const { otherUser, unreadCount, lastMessage } = conversation;
  return (
    <ListItemButton sx={{ gap: 2 }}>
      <Badge color="success" badgeContent={unreadCount}>
        <Avatar
          sx={{ bgcolor: green[500] }}
          variant="rounded"
          src={otherUser.avatarUrl}
          alt={otherUser.name}
        />
      </Badge>
      <ListItemContent sx={{ textAlign: "end", overflow: "hidden" }}>
        <Typography noWrap fontWeight="md" textOverflow={"ellipsis"}>
          {lastMessage?.content}
        </Typography>
        <Typography fontSize={"sm"}>
          {tsToAgo(lastMessage?.createdAt)}
        </Typography>
      </ListItemContent>
    </ListItemButton>
  );
}

export default ConversationCard;

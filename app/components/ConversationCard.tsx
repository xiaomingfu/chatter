import { ListItemContent } from "@mui/joy";
import { Avatar, Badge, ListItemButton, Typography } from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";

import { tsToAgo } from "../lib/utils/datetime";
import { queryParamToString } from "../lib/utils/query";

interface ConversationCardProps {
  conversation: any;
}

function ConversationCard({ conversation }: ConversationCardProps) {
  const { otherUser, unreadCount, lastMessage } = conversation;
  const router = useRouter();
  const isSelected =
    queryParamToString(router.query.conversationId) === conversation.id;

  return (
    <ListItemButton
      sx={{
        gap: 2,
        padding: "2px",
        backgroundColor: isSelected ? `${blue[100]} !important` : "inherit",
      }}
      onClick={() => {
        router.push(`/chat/${conversation.id}`);
      }}
    >
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

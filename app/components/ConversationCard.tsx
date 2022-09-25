import { ListItemContent } from "@mui/joy";
import { Avatar, Badge, ListItemButton, Typography } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
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
        backgroundColor: isSelected ? `${blue[600]} !important` : "inherit",
      }}
      onClick={() => {
        router.push(`/chat/${conversation.id}`);
      }}
    >
      <Badge color="warning" badgeContent={unreadCount}>
        <Avatar
          variant="rounded"
          src={otherUser.avatarUrl}
          alt={otherUser.name}
        />
      </Badge>
      <ListItemContent
        sx={{
          textAlign: "end",
          overflow: "hidden",
        }}
      >
        <Typography
          noWrap
          fontSize={12}
          color={grey[isSelected ? 100 : 600]}
          textOverflow={"clip"}
        >
          {lastMessage?.content}
        </Typography>
        <Typography fontSize={11} color={grey[isSelected ? 200 : 500]}>
          {tsToAgo(lastMessage?.createdAt)}
        </Typography>
      </ListItemContent>
    </ListItemButton>
  );
}

export default ConversationCard;

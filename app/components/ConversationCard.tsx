import { Avatar, Badge, Box, ListItemButton, Typography } from "@mui/material";
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
      sx={[
        {
          gap: 2,
        },
        isSelected && {
          color: "primary.contrastText",
          bgcolor: "primary.main",
          ":hover": {
            bgcolor: "primary.dark",
          },
        },
      ]}
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
      <Box
        sx={{
          width: "100%",
          textAlign: "end",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={1}>
          <Typography noWrap fontSize={14} textOverflow={"clip"}>
            {otherUser?.name}
          </Typography>
          <Typography noWrap fontSize={12} textOverflow={"clip"}>
            {lastMessage && tsToAgo(lastMessage.createdAt)}&nbsp;
          </Typography>
        </Box>
        <Typography noWrap fontSize={12}>
          {lastMessage?.content}&nbsp;
        </Typography>
      </Box>
    </ListItemButton>
  );
}

export default ConversationCard;

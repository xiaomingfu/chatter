import { ListDivider, ListItem } from "@mui/joy";
import { Box, Grid, List } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import ChatBox from "../../components/ChatBox";
import ConversationCard from "../../components/ConversationCard";
import MessagesList from "../../components/MessagesList";
import Navbar from "../../components/Navbar";
import { useConversations } from "../../lib/graph/conversation";
import { queryParamToString } from "../../lib/utils/query";

import type { NextPage } from "next";
const Chat: NextPage = () => {
  const router = useRouter();
  const conversationId = queryParamToString(router.query.conversationId);
  const { loading, error, data } = useConversations();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Box>
      <Navbar />
      <Grid container spacing={1}>
        <Grid item xs={4} md={3}>
          <List>
            {data?.conversations?.map((conversation: any, index: number) => (
              <React.Fragment key={conversation.id}>
                <ListItem>
                  <ConversationCard conversation={conversation} />
                </ListItem>
                {index !== data?.conversations?.length - 1 && <ListDivider />}
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={8} md={9}>
          <Box padding={2}>
            {conversationId && (
              <Box>
                <MessagesList conversationId={conversationId} />
                <ChatBox conversationId={conversationId} />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;

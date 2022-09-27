import { Box, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import ChatBox from "../../components/ChatBox";
import ConversationsList from "../../components/ConversationsList";
import Layout from "../../components/Layout";
import MessagesList from "../../components/MessagesList";
import { useSearchInput } from "../../components/SearchInputContext";
import UsersGrid from "../../components/UsersGrid";
import { queryParamToString } from "../../lib/utils/query";

import type { NextPage } from "next";
const Chat: NextPage = () => {
  const router = useRouter();
  const conversationId = queryParamToString(router.query.conversationId);
  const { searchInput } = useSearchInput();

  if (searchInput) {
    return (
      <Layout>
        <UsersGrid />
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container>
        <Grid item xs={4} md={3} xl={2}>
          <Paper variant="outlined" square sx={{ ml: "-1px" }}>
            <ConversationsList />
          </Paper>
        </Grid>
        <Grid item xs={8} md={9} xl={10} padding={2}>
          {conversationId && (
            <Box>
              <MessagesList conversationId={conversationId} />
              <ChatBox conversationId={conversationId} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Chat;

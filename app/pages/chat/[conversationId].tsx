import { Divider, Grid, List } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import ConversationCard from "../../components/ConversationCard";
import MessagesList from "../../components/MessagesList";
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Link href="/">Home</Link>
      </Grid>
      <Grid item xs={6} sm={4} md={3}>
        <List>
          {data?.conversations?.map((conversation: any, index: number) => (
            <React.Fragment key={conversation.id}>
              <ConversationCard conversation={conversation} />
              {index !== data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Grid item xs={6} sm={8} md={9}>
        {conversationId && <MessagesList conversationId={conversationId} />}
      </Grid>
    </Grid>
  );
};

export default Chat;

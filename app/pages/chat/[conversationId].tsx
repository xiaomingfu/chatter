import { Divider, Grid, List } from "@mui/material";
import Link from "next/link";
import React from "react";

import ConversationCard from "../../components/ConversationCard";
import { useConversations } from "../../lib/graph/conversation";

import type { NextPage } from "next";

const Chat: NextPage = () => {
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
    </Grid>
  );
};

export default Chat;

import type { NextPage } from "next";
import React from "react";
import { Grid, Paper } from "@mui/material";

import { useConversations } from "../../lib/graph/conversation";
import Link from "next/link";

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
        <Paper elevation={3}>
          {data?.conversations?.map((conversation: any) => (
            <p key={conversation.id}>{conversation.id}</p>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;

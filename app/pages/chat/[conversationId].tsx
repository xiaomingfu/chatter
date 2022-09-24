import type { NextPage } from "next";
import React from "react";
import { Grid, Paper, Stack } from "@mui/material";

import { useConversations } from "../../lib/graph/conversation";
import Link from "next/link";
import ConversationCard from "../../components/ConversationCard";
import { List, ListDivider, ListItem, Sheet } from "@mui/joy";

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
        <Sheet
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: 300,
            borderRadius: "sm",
          }}
        >
          <List sx={{ py: "var(--List-divider-gap)" }}>
            {data?.conversations?.map((conversation: any, index: number) => (
              <React.Fragment key={conversation.id}>
                <ListItem>
                  <ConversationCard conversation={conversation} />
                </ListItem>
                {index !== data.length - 1 && <ListDivider />}
              </React.Fragment>
            ))}
          </List>
        </Sheet>
      </Grid>
    </Grid>
  );
};

export default Chat;

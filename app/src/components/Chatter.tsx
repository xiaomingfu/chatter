import { Box, Grid, Paper } from "@mui/material";

import ChatBox from "../components/ChatBox";
import ConversationsList from "../components/ConversationsList";
import MessagesList from "../components/MessagesList";
import useConversationId from "../lib/graph/local/conversationId";
import { useMessageCreated } from "../lib/graph/message";

const Chatter = () => {
  const { conversationId } = useConversationId();
  useMessageCreated(conversationId);

  return (
    <Grid container>
      <Grid item xs={4} md={3} xl={2}>
        <Paper
          variant="outlined"
          square
          sx={{ ml: "-1px", height: "calc(100vh - 64px)", overflowY: "scroll" }}
        >
          <ConversationsList />
        </Paper>
      </Grid>
      <Grid item xs={8} md={9} xl={10}>
        {conversationId === "" ? (
          <Box padding={2}>Pls select a conversation.</Box>
        ) : (
          <Box>
            <MessagesList conversationId={conversationId} />
            <ChatBox conversationId={conversationId} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Chatter;

import { Box, Grid, Paper } from "@mui/material";

import ChatBox from "./ChatBox";
import ConversationsList from "./ConversationsList";
import MessagesList from "./MessagesList";
import useConversationId from "../lib/graph/local/conversationId";
import { useMessageCreated } from "../lib/graph/message";
import Navbar from "./Navbar";

const ChatterPage = () => {
  const { conversationId } = useConversationId();
  useMessageCreated(conversationId);

  return (
    <Box>
      <Box component={Navbar} sx={{ height: "64px" }} />
      <Box sx={{ height: "calc(100vh - 64px)", overflowY: "hidden" }}>
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
      </Box>
    </Box>
  );
};

export default ChatterPage;

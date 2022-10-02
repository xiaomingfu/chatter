import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useStartConversation } from "../lib/graph/conversation";
import useConversationId from "../lib/graph/local/conversationId";
import useSearchInput from "../lib/graph/local/searchInput";

interface UserCardProps {
  userId: string;
  avatar: string;
  name: string;
  email: string;
  job: string;
}

function UserCard({ userId, avatar, name, email, job }: UserCardProps) {
  const startConversation = useStartConversation();

  const { setConversationId } = useConversationId();
  const { setSearchInput } = useSearchInput();

  const sendMessageHandler = () => {
    startConversation({ variables: { otherUserId: userId } }).then((resp) => {
      const conversationId = resp.data?.startConversation?.id;
      if (conversationId) {
        setConversationId(conversationId);
        setSearchInput("");
      }
    });
  };

  const useUserHandler = () => {
    localStorage.setItem("currentUserId", userId);
    setSearchInput("");
    window.location.reload();
  };

  return (
    <Card>
      <CardMedia component="img" height="160" image={avatar} alt="avatar"
      
      
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email} • {job}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={sendMessageHandler}
        >
          Send message
        </Button>
        <Button size="small">View Profile</Button>
      </CardActions>
      <CardActions>
        <Button variant="contained" size="small" onClick={useUserHandler}>
          Set as me
        </Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;

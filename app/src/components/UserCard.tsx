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
import { UserProfile } from "../lib/graph/profile";

interface UserCardProps {
  user: UserProfile;
}

function UserCard({ user }: UserCardProps) {
  const startConversation = useStartConversation();

  const { setConversationId } = useConversationId();
  const { setSearchInput } = useSearchInput();

  const sendMessageHandler = () => {
    startConversation({ variables: { otherUserId: user.id } }).then((resp) => {
      const conversationId = resp.data?.startConversation?.id;
      if (conversationId) {
        setConversationId(conversationId);
        setSearchInput("");
      }
    });
  };

  const useUserHandler = () => {
    localStorage.setItem("currentUserId", user.id);
    setSearchInput("");
    setConversationId("");
    window.location.reload();
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={`https://i.pravatar.cc/400?u=${user.id}`}
        alt="avatar"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.company} • {user.title}
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

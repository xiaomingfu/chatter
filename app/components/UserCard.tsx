import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useStartConversation } from "../lib/graph/conversation";

interface UserCardProps {
  userId: string;
  avatar: string;
  name: string;
  email: string;
  job: string;
}

function UserCard({ userId, avatar, name, email, job }: UserCardProps) {
  const startConversation = useStartConversation();

  const sendMessageHandler = () => {
    startConversation({ variables: { otherUserId: userId } }).then((res) => {
      console.log(res);

      // redirect to conversation
    });
  };

  return (
    <Card>
      <CardMedia component="img" height="160" image={avatar} alt="avatar" />
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
    </Card>
  );
}

export default UserCard;

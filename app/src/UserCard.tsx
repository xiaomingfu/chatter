import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface UserCardProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

function UserCard({ avatar, name, email, job }: UserCardProps) {
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
        <Button size="small" variant="contained" color="info">
          Send message
        </Button>
        <Button size="small">View Profile</Button>
      </CardActions>
    </Card>
  );
}

export default UserCard;

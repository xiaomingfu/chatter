import UserCard from "./UserCard";
import { Container, Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <UserCard
              avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
              name="Artur Krysiak"
              email="a@a.com"
              job="Software Engineer"
            />
          </Grid>
          <Grid item xs={4}>
            <UserCard
              avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
              name="Artur Krysiak"
              email="a@a.com"
              job="Software Engineer"
            />
          </Grid>
          <Grid item xs={4}>
            <UserCard
              avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
              name="Artur Krysiak"
              email="a@a.com"
              job="Software Engineer"
            />
          </Grid>
          <Grid item xs={4}>
            <UserCard
              avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
              name="Artur Krysiak"
              email="a@a.com"
              job="Software Engineer"
            />
          </Grid>
          <Grid item xs={4}>
            <UserCard
              avatar="https://avatars.githubusercontent.com/u/1443320?v=4"
              name="Artur Krysiak"
              email="a@a.com"
              job="Software Engineer"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;

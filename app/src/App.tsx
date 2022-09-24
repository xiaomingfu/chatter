import UserCard from "./UserCard";
import { Container, Grid } from "@mui/material";

import { useUserProfiles } from "./lib/graph/profile";

function App() {
  const { loading, error, data } = useUserProfiles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {data?.allUserProfiles?.map((profile: any) => (
            <Grid item xs={12} sm={6} md={4} key={profile.id}>
              <UserCard
                userId={profile.id}
                avatar={profile.avatarUrl}
                name={profile.name}
                email={profile.company}
                job={profile.title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;

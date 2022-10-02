import { Grid } from "@mui/material";

import useSearchInput from "../lib/graph/local/searchInput";
import { useUserProfiles } from "../lib/graph/profile";
import UserCard from "./UserCard";

function UsersGrid() {
  const { loading, error, data } = useUserProfiles();
  const { searchInput } = useSearchInput();
  const users = (data?.allUserProfiles || []).filter((user: any) => {
    const p = searchInput.toLowerCase();
    return [user.name, user.company, user.title].some((field) =>
      field.toLowerCase().includes(p)
    );
  });
  return (
    <Grid container spacing={3} padding={3}>
      {loading && <Grid item>Loading...</Grid>}
      {error && <Grid item>Error :(</Grid>}
      {users.map((profile: any) => (
        <Grid item xs={6} sm={4} md={3} key={profile.id}>
          <UserCard
            userId={profile.id}
            avatar={`https://i.pravatar.cc/320?u=${profile.id}`}
            name={profile.name}
            email={profile.company}
            job={profile.title}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default UsersGrid;

import { Grid } from "@mui/material";
import React from "react";

import { useUserProfiles } from "../lib/graph/profile";
import UserCard from "./UserCard";

function UsersGrid() {
  const { loading, error, data } = useUserProfiles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid container spacing={3} padding={3}>
      {data?.allUserProfiles?.map((profile: any) => (
        <Grid item xs={6} sm={4} md={3} key={profile.id}>
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
  );
}

export default UsersGrid;

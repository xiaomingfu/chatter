import { Container, Grid } from "@mui/material";
import React from "react";

import UserCard from "../components/UserCard";
import { useUserProfiles } from "../lib/graph/profile";

import type { NextPage } from "next";
const Home: NextPage = () => {
  const { loading, error, data } = useUserProfiles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Users</h1>
        </Grid>
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
  );
};

export default Home;

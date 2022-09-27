import { Container, Grid } from "@mui/material";
import React from "react";

import UsersGrid from "../components/UsersGrid";
import { useUserProfiles } from "../lib/graph/profile";

import type { NextPage } from "next";
const Home: NextPage = () => {
  const { loading, error, data } = useUserProfiles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <UsersGrid />
      </Grid>
    </Container>
  );
};

export default Home;

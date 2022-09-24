import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Container, Grid } from "@mui/material";

import UserCard from "../components/UserCard";

import { useUserProfiles } from "../lib/graph/profile";

const Home: NextPage = () => {
  const { loading, error, data } = useUserProfiles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
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
  );
};

export default Home;

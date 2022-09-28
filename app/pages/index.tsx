import dynamic from "next/dynamic";
import React from "react";

import Layout from "../components/Layout";
import UsersGrid from "../components/UsersGrid";
import useSearchInput from "../lib/graph/local/searchInput";

const ChatterWithNoSSR = dynamic(() => import("../components/Chatter"), {
  ssr: false,
});

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { searchInput } = useSearchInput();

  if (searchInput) {
    return (
      <Layout>
        <UsersGrid />
      </Layout>
    );
  }

  return (
    <Layout>
      <ChatterWithNoSSR />
    </Layout>
  );
};

export default Home;

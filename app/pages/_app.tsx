import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

import { apolloClient } from "../lib/graph";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

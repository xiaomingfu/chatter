import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

import { SearchInputContextProvider } from "../components/SearchInputContext";
import { apolloClient } from "../lib/graph";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SearchInputContextProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </SearchInputContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;

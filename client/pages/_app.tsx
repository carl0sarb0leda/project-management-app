import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          clients: {
            merge(existing, incoming) {
              /** While returning only the "incoming" data may be
               * appropriate for some use cases, it's important to understand
               * that this approach will cause the cached data to be completely overwritten
               * every time new data is fetched from the server.
               * This can lead to performance issues if you are frequently
               * re-fetching large amounts of data. */
              // if (existing && incoming) {
              //   return [...existing, ...incoming]; // merging rather than overwrite
              // }
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

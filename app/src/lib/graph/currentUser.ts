import { gql, useQuery } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      totalUnreadMessagesCnt
    }
  }
`;

export function useCurrentUser() {
  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  return {
    data,
    loading,
    error,
  };
}

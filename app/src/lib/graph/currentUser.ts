import { gql, useQuery } from "@apollo/client";

export interface CurrentUser {
  id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  totalUnreadMessagesCnt: number;
}

export interface GetCurrentUser {
  currentUser: CurrentUser;
}

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      avatarUrl
      email
      totalUnreadMessagesCnt
    }
  }
`;

export function useCurrentUser() {
  const { data, loading, error } = useQuery<GetCurrentUser>(GET_CURRENT_USER);

  return {
    data,
    loading,
    error,
  };
}

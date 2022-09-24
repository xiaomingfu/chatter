import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILES = gql`
  query GetUserProfiles {
    allUserProfiles {
      id
      name
      avatarUrl
      company
      title
    }
  }
`;

export const useUserProfiles = () => {
  const { data, loading, error } = useQuery(GET_USER_PROFILES);

  return {
    data,
    loading,
    error,
  };
};

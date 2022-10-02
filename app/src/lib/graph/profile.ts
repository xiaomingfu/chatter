import { gql, useQuery } from "@apollo/client";

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  company?: string;
  title?: string;
}

export interface AllUserProfiles {
  allUserProfiles: UserProfile[];
}

const allUserProfilesQueryDocument = gql`
  query UserProfiles {
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
  const { data, loading, error } = useQuery<AllUserProfiles>(
    allUserProfilesQueryDocument
  );

  return {
    data,
    loading,
    error,
  };
};

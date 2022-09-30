import { gql, makeVar, useQuery } from "@apollo/client";

export interface SearchInput {
  value: string;
}

export const searchInputVar = makeVar<SearchInput>({
  value: "",
});

const GetSearchInput = gql`
  query GetSearchInput {
    searchInput @client {
      value
    }
  }
`;

const useSearchInput = () => {
  const {
    data: { searchInput },
  } = useQuery(GetSearchInput);

  return {
    searchInput: searchInput.value,
    setSearchInput: (value: string) => {
      searchInputVar({
        value,
      });
    },
  };
};

export default useSearchInput;

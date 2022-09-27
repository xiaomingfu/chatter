import React from "react";

interface SearchInputContextProps {
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
}

const SearchInputContext = React.createContext<SearchInputContextProps>({
  searchInput: "",
  setSearchInput: () => {},
});

export default SearchInputContext;

export const SearchInputContextProvider = ({ children }: any) => {
  const [searchInput, setSearchInput] = React.useState("");

  return (
    <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchInputContext.Provider>
  );
};

export function useSearchInput() {
  return React.useContext(SearchInputContext);
}

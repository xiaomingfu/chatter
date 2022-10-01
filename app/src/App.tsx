import { Box } from "@mui/material";

import Chatter from "./components/Chatter";
import Navbar from "./components/Navbar";
import UsersGrid from "./components/UsersGrid";
import useSearchInput from "./lib/graph/local/searchInput";

function App() {
  const { searchInput } = useSearchInput();

  if (searchInput) {
    return (
      <Box>
        <Box component={Navbar} sx={{ height: "64px" }} />
        <Box sx={{ height: "calc(100vh - 64px)", overflowY: "scroll" }}>
          <UsersGrid />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box component={Navbar} sx={{ height: "64px" }} />
      <Box sx={{ height: "calc(100vh - 64px)", overflowY: "hidden" }}>
        <Chatter />
      </Box>
    </Box>
  );
}

export default App;

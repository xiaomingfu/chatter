import { Box } from "@mui/material";

import Navbar from "./Navbar";
import UsersGrid from "./UsersGrid";

function SearchPage() {
  return (
    <Box>
      <Box component={Navbar} sx={{ height: "64px" }} />
      <Box sx={{ height: "calc(100vh - 64px)", overflowY: "scroll" }}>
        <UsersGrid />
      </Box>
    </Box>
  );
}

export default SearchPage;

import { Box } from "@mui/system";

import Navbar from "./Navbar";

function Layout({ children }: any) {
  return (
    <Box>
      <Box component={Navbar} sx={{ height: "64px" }} />
      <Box sx={{ height: "calc(100vh - 64px)" }}>{children}</Box>
    </Box>
  );
}

export default Layout;

import { Box } from "@mui/system";

import Navbar from "./Navbar";

function Layout({ children }: any) {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;

import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

import useSearchInput from "../lib/graph/local/searchInput";

const SearchInput = styled(InputBase)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  input: {
    padding: 0,
  },
}));

function Navbar() {
  const { searchInput, setSearchInput } = useSearchInput();

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" sx={{ height: "100%", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatter
          </Typography>
          <Box gap={2} sx={{ display: "flex" }}>
            <SearchInput
              placeholder="Search ..."
              size="small"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <IconButton aria-label="show 16 new notifications" color="inherit">
              <Badge badgeContent={16} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

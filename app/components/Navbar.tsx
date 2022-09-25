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

const SearchInput = styled(InputBase)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  input: {
    padding: 0,
  },
}));

function Navbar() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <AppBar position="static" sx={{ height: "100%" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chatter
          </Typography>
          <Box gap={2} sx={{ display: "flex" }}>
            <SearchInput placeholder="Search ..." size="small" />
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

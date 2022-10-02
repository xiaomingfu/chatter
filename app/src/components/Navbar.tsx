import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useCurrentUser } from "../lib/graph/currentUser";
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
  const { data } = useCurrentUser();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <AppBar position="sticky" sx={{ boxShadow: "none" }}>
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
              <Badge
                badgeContent={data?.currentUser.totalUnreadMessagesCnt || 0}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title={data?.currentUser.name || ""}>
              <Avatar
                src={`https://i.pravatar.cc/150?u=${data?.currentUser.id}`}
                alt={data?.currentUser.name}
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

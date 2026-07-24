import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  DRAWER_WIDTH,
  COLLAPSED_DRAWER_WIDTH,
} from "./layoutConstants";

function Navbar({ open, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const navigate = useNavigate();
const [unreadNotifications, setUnreadNotifications] = useState([]);

useEffect(() => {
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  const filtered = notifications.filter((n) => {
    if (n.role !== user?.role) return false;

    if (user.role === "employee") {
      return (
        n.userId === user.employeeId &&
        !n.read
      );
    }

    if (user.role === "departmentAdmin") {
      return (
        n.departmentId === user.departmentId &&
        !n.read
      );
    }

    if (user.role === "provider") {
      return (
        n.userId === user.providerId &&
        !n.read
      );
    }

    return !n.read;
  });

  setUnreadNotifications(filtered);
}, [user]);
  const openSettings = (event) => {
  setSettingsAnchor(event.currentTarget);
};

const closeSettings = () => {
  setSettingsAnchor(null);
};

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openNotifications = (event) => {
  setNotificationAnchor(event.currentTarget);
};

const closeNotifications = () => {
  setNotificationAnchor(null);
};

  //  PROFILE NAVIGATION
  const goToProfile = () => {
    handleClose();
    navigate("/department/profile"); 
  };

  //  LOGOUT
  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleClick = (item) => {
  if (item.action === "logout") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  } else {
    navigate(item.path);
  }
};

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: `calc(100% - ${
          open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH
        }px)`,

        ml: open
          ? `${DRAWER_WIDTH}px`
          : `${COLLAPSED_DRAWER_WIDTH}px`,

      borderBottom: "1px solid #E2E8F0",

bgcolor: "#FFFFFF",

boxShadow: "0 3px 12px rgba(0,0,0,.05)",
      }}
    >
     <Toolbar
  sx={{
    height: 72,
    display: "flex",
    justifyContent: "space-between",
  }}
>
        <Box sx={{ flexGrow: 1 }}>

  <Typography
    sx={{
      fontSize: 20,
      fontWeight: 700,
      color: "#111827",
    }}
  >
    Dedicated Freight Corridor Corporation of India Limited
  </Typography>

  <Typography
    sx={{
      fontSize: 12,
      color: "#6B7280",
    }}
  >
    No Due Management System
  </Typography>

</Box>

        {/* SETTINGS */}
      <Tooltip title="Settings">
  <IconButton onClick={openSettings}>
    <SettingsRoundedIcon />
  </IconButton>
</Tooltip>

        {/* NOTIFICATIONS */}
        <Tooltip title="Notifications">
  <IconButton
  onClick={openNotifications}
  sx={{
    mr: 2,
    bgcolor: "#F8FAFC",
    "&:hover": {
      bgcolor: "#EEF2FF",
    },
  }}
>
            <Badge color="error" badgeContent={unreadNotifications.length}>
              <NotificationsNoneRoundedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* AVATAR */}
        <IconButton onClick={handleOpen}>
     <Avatar
  sx={{
    bgcolor: "#D32F2F",
    width: 42,
    height: 42,
    fontWeight: 700,
  }}
>
            {user?.name?.charAt(0)}
          </Avatar>
        </IconButton>

        {/* MENU */}
        <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
  PaperProps={{
    sx: {
      mt: 1,
      width: 230,
      borderRadius: 3,
      boxShadow: "0 8px 30px rgba(0,0,0,.12)",
    },
  }}
>

  <MenuItem onClick={goToProfile}>
    <PersonOutlineRoundedIcon
      sx={{ mr: 1.5, fontSize: 20 }}
    />
    My Profile
  </MenuItem>

  

  <MenuItem
    onClick={handleLogout}
    sx={{
      color: "#D32F2F",
      fontWeight: 600,
    }}
  >
    <LogoutRoundedIcon
      sx={{ mr: 1.5, fontSize: 20 }}
    />
    Logout
  </MenuItem>

</Menu>
<Menu
  anchorEl={notificationAnchor}
  open={Boolean(notificationAnchor)}
  onClose={closeNotifications}
  PaperProps={{
    sx: {
      width: 350,
      borderRadius: 2,
    },
  }}
>
  {unreadNotifications.length === 0 ? (
    <MenuItem>No Notifications</MenuItem>
  ) : (
    unreadNotifications.map((notification) => (
      <MenuItem key={notification.id}>
        <Box>
          <Typography fontWeight={600}>
            {notification.employeeName}
          </Typography>

          <Typography variant="body2">
            Request ID: {notification.requestId}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {notification.message}
          </Typography>
        </Box>
      </MenuItem>
    ))
  )}
</Menu>
<Menu
  anchorEl={settingsAnchor}
  open={Boolean(settingsAnchor)}
  onClose={closeSettings}
  PaperProps={{
    sx: {
      width: 220,
      borderRadius: 3,
    },
  }}
>
  <MenuItem
    onClick={() => {
      closeSettings();
      navigate("/change-password");
    }}
  >
    <LockResetRoundedIcon sx={{ mr: 1 }} />
    Change Password
  </MenuItem>
</Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
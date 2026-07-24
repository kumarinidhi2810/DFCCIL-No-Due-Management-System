import { useState } from "react";
import { Box, Toolbar } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { Outlet } from "react-router-dom";

import {
  DRAWER_WIDTH,
  COLLAPSED_DRAWER_WIDTH,
} from "../components/layout/layoutConstants";

function DashboardLayout({

  user,
  menuItems
}) {

  const [open, setOpen] = useState(true);



  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar
        open={open}
        setOpen={setOpen}
        menuItems={menuItems}
        user={user}
      />
<Box
  sx={{
    flexGrow: 1,
    width: 0,
    minHeight: "100vh",
    bgcolor: "#F4F6F9",
    display: "flex",
    flexDirection: "column",
    transition: "all .3s ease",
  }}
>
  <Navbar
    open={open}
    setOpen={setOpen}
    user={user}
  />

  <Toolbar />

  <Box
    sx={{
      flex: 1,
      p: { xs: 2, md: 3 },
      overflow: "auto",
    }}
  >
    <Outlet />
  </Box>
</Box>

    </Box>
  );
}

export default DashboardLayout;
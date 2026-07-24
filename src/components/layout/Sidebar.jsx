import { Drawer, Toolbar, Box, Divider } from "@mui/material";

import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SidebarUser";
import SidebarMenu from "./SidebarMenu";

import {
  DRAWER_WIDTH,
  COLLAPSED_DRAWER_WIDTH,
} from "./layoutConstants";

function Sidebar({ open, setOpen, menuItems, user }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
        flexShrink: 0,

      "& .MuiDrawer-paper": {
  width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
  transition: "all .3s ease",
  overflowX: "hidden",
  whiteSpace: "nowrap",
  boxSizing: "border-box",

 background:
"linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)",
   borderRight: "1px solid #E2E8F0",
boxShadow:"2px 0px 12px rgba(0,0,0,.05)",
display: "flex",
flexDirection: "column",
}
      }}
    >
      <Box
  sx={{
    height: 5,
  }}
/>

      <SidebarHeader
        open={open}
        setOpen={setOpen}
      />

      <Divider />

      <SidebarUser
        open={open}
        user={user}
      />

      <Divider />

      <Box
  sx={{
    flex: 1,
    mt: 2,
    PX:1,
    overflowY: "auto",

    "&::-webkit-scrollbar": {
      width: 5,
    },

    "&::-webkit-scrollbar-thumb": {
      background: "#D1D5DB",
      borderRadius: 5,
    },
  }}
>
        <SidebarMenu
          open={open}
          menuItems={menuItems}
        />
      </Box>
    </Drawer>
  );
}

export default Sidebar;
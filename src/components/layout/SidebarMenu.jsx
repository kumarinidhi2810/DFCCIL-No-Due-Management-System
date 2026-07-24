import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";

function SidebarMenu({ menuItems, open }) {
  const location = useLocation();

  return (
    <List
      sx={{
        px: 1.5,
        py: 1,
      }}
    >
      {menuItems.map((item) => {
        const active = location.pathname === item.path;

        return (
          <ListItemButton
            key={item.title}
            component={Link}
            to={item.path}
            selected={active}
            sx={{
              minHeight: 50,
              borderRadius: 3,
              mb: 1,
              px: 2,
borderLeft: active
  ? "4px solid #991B1B"
  : "4px solid transparent",
              transition: "all .25s ease",
              boxShadow: active
  ? "0 8px 18px rgba(211,47,47,.25)"
  : "none",


              color: active ? "#FFFFFF" : "#374151",

bgcolor: active? "#D32F2F": "transparent",
              "& .MuiListItemIcon-root": {
color: active ? "#FFFFFF" : "#64748B",                minWidth: 40,
              },

              "& .MuiListItemText-primary": {
                fontSize: 14,
fontWeight: active ? 700 : 600,              },

              "&:hover": {
               bgcolor: active
  ? "#B71C1C"
  : "#F8FAFC",

transform: "translateX(6px)",
                "& .MuiListItemIcon-root": {
 color: active ? "#fff" : "#D32F2F",                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            {open && (
              <ListItemText
                primary={item.title}
              />
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default SidebarMenu;
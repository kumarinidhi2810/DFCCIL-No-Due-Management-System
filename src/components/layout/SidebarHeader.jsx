import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import logo from "../../assets/images/dfccil-logo.png";

function SidebarHeader({ open, setOpen }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "space-between" : "center",
      }}
    >
      {open && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="DFCCIL"
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1,
              bgcolor: "#fff",
              p: 0.4,
              border: "1px solid #E5E7EB",
            }}
          />

          <Box>
  <Typography
    sx={{
      fontWeight: 800,
      color: "#D32F2F",
      fontSize: 22,
      letterSpacing: 1,
    }}
  >
    DFCCIL
  </Typography>

  <Typography
    sx={{
      fontSize: 11,
      color: "#64748B",
      lineHeight: 1.2,
    }}
  >
    No Due Management
  </Typography>
</Box>
        </Box>
      )}

      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          border: "1px solid #E5E7EB",
          bgcolor: "#F8FAFC",
          "&:hover": {
            bgcolor: "#EEF2FF",
          },
        }}
      >
        <MenuRoundedIcon />
      </IconButton>
    </Box>
  );
}

export default SidebarHeader;
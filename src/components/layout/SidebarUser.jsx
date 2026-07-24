import {
  Avatar,
  Box,
  Typography,
  Chip,
} from "@mui/material";

function SidebarUser({ open, user }) {
  return (
    <Box
      sx={{
       pt: 1,
px: 2,
pb: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {open ? (
        <Box
          sx={{
            width: "100%",
           background:
  "linear-gradient(180deg,#FFFFFF,#F8FAFC)",
          border: "1px solid #E2E8F0",
boxShadow: "0 6px 18px rgba(0,0,0,.05)",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              mx: "auto",
              mb: 1.5,
              bgcolor: "#D32F2F",
boxShadow: "0 8px 20px rgba(211,47,47,.30)",
border: "3px solid #fff",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#111827",
            }}
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              mb: 1.5,
            }}
          >
            {user?.email}
          </Typography>

        <Chip
  label={user?.role}
  size="small"
  sx={{
    bgcolor: "#FEE2E2",
    color: "#B91C1C",
    fontWeight: 700,
    borderRadius: "8px",
  }}
/>
        </Box>
      ) : (
        <Avatar
          sx={{
            width: 48,
            height: 48,
           bgcolor: "#D32F2F",
boxShadow: "0 8px 20px rgba(211,47,47,.30)",
border: "3px solid #fff",
            fontWeight: 700,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      )}
    </Box>
  );
}

export default SidebarUser;
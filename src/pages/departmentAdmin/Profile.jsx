import { Paper, Avatar, Typography, Box, Divider } from "@mui/material";

function Profile() {
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const departments = JSON.parse(
  localStorage.getItem("departments") || "[]"
);

const departmentName =
  departments.find(
    (dept) =>
      String(dept.departmentId) ===
      String(user.departmentId)
  )?.departmentName || "";

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 3, width: 380, borderRadius: 3, textAlign: "center" }}>

        {/* Avatar */}
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: "auto",
            mb: 2,
            bgcolor: "primary.main",
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </Avatar>

        {/* Name */}
        <Typography variant="h6">
          {user?.name || "User"}
        </Typography>

        {/* Role */}
        <Typography color="text.secondary">
          {user?.role || "Department User"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Details */}
        <Box sx={{ textAlign: "left" }}>
          <Typography>
            <b>Email:</b> {user?.email || "Not Available"}
          </Typography>

          <Typography>
            <b>Department:</b> {departmentName || "Not Assigned"}

          </Typography>
        </Box>

      </Paper>
    </Box>
  );
}

export default Profile;
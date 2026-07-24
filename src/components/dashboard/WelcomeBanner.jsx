import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

function WelcomeBanner({ user }) {
  const departments =
  JSON.parse(localStorage.getItem("departments")) || [];

const departmentName =
  departments.find(
    (dept) => dept.departmentId === user.departmentId
  )?.departmentName || "";
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
console.log(departments,"departments")
  return (
    <Paper
      elevation={3}
      sx={{
        py: 1,
px: 3,
        mb: 4,
        borderRadius: 4,
        background:
          "linear-gradient(135deg,#0F4C81,#2563EB)",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left */}
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Welcome Back, {user.name} 
          </Typography>

          <Typography
            sx={{
              mt: 1,
              opacity: 0.9,
        
            }}
          >
            Employee Dashboard
          </Typography>

          <Box
            mt={2}
            display="flex"
            gap={1}
            flexWrap="wrap"
          >
            <Chip
              label={`Employee ID : ${user.employeeId}`}
              sx={{
                bgcolor: "rgba(255,255,255,.15)",
                color: "#fff",
              }}
            />

           <Chip
  label={`Department : ${departmentName}`}
  sx={{
    bgcolor: "rgba(255,255,255,.15)",
    color: "#fff",
  }}
/>
<Chip
  label={`Designation : ${user.designation}`}
  sx={{
    bgcolor: "rgba(255,255,255,.15)",
    color: "#fff",
  }}
/>
          
          </Box>
        </Box>

        {/* Right */}
        <Box textAlign="center">
          <Avatar
            sx={{
              width: 60,
              height: 60,
              fontSize: 24,
              fontWeight: 700,
              bgcolor: "#fff",
              color: "#0F4C81",
              mb: 1,
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography fontWeight={600}>
            {user.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.8 }}
          >
            Employee
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default WelcomeBanner;
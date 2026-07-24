import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { useNavigate } from "react-router-dom";

function ProviderDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

const requests =
  JSON.parse(localStorage.getItem("requests")) || [];

const providerId = user.providerId;

const providerRequests = requests.filter((request) =>
  request.services?.some(
    (service) => service.providerId === providerId
  )
);

const pendingCount = providerRequests.filter((request) =>
  request.services?.some(
    (service) =>
      service.providerId === providerId &&
      service.status === "DEPT_APPROVED"
  )
).length;

const approvedCount = providerRequests.filter((request) =>
  request.services?.some(
    (service) =>
      service.providerId === providerId &&
      service.status === "PROVIDER_APPROVED"
  )
).length;
const rejectedCount = providerRequests.filter((request) =>
  request.services?.some(
    (service) =>
      service.providerId === providerId &&
      service.status === "REJECTED"
  )
).length;


const totalCount = providerRequests.length;

  const cards = [
    {
      title: "Pending Requests",
      value: pendingCount,
      icon: <AssignmentOutlinedIcon fontSize="large" />,
      color: "#F59E0B",
      path: "/provider/pending",
    },
    {
      title: "Approved Requests",
      value: approvedCount,
      icon: <CheckCircleOutlineOutlinedIcon fontSize="large" />,
      color: "#10B981",
      path: "/provider/approved",
    },
    {
      title: "Rejected Requests",
      value: rejectedCount,
      icon: <CancelOutlinedIcon fontSize="large" />,
      color: "#EF4444",
      path: "/provider/rejected",
    },
    {
      title: "Total Requests",
      value: totalCount,
      icon: <ListAltOutlinedIcon fontSize="large" />,
      color: "#2563EB",
      path: "/provider/pending",
    },
  ];
  

  return (
    <Box
      sx={{
        p: 4,
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Provider Dashboard
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Welcome to the Provider Portal
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                  mt={1}
                >
                  {card.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  background: card.color,
                  color: "#fff",
                  p: 1.5,
                  borderRadius: 2,
                }}
              >
                {card.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper
        elevation={3}
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          Quick Actions
        </Typography>

        <Button
          variant="contained"
          sx={{
            mr: 2,
            background: "#D90429",
            "&:hover": {
              background: "#B00020",
            },
          }}
          onClick={() => navigate("/provider/pending")}
        >
          View Pending Requests
        </Button>
      </Paper>
    </Box>
  );
}

export default ProviderDashboard;
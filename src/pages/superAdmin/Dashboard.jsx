import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import MiscellaneousServicesOutlinedIcon from "@mui/icons-material/MiscellaneousServicesOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const employees =
    JSON.parse(localStorage.getItem("employees") || "[]");

  const departments =
    JSON.parse(localStorage.getItem("departments") || "[]");

  const services =
    JSON.parse(localStorage.getItem("services") || "[]");

  const providers =
    JSON.parse(localStorage.getItem("providers") || "[]");

  const requests =
    JSON.parse(localStorage.getItem("requests") || "[]");

  const getRequestStatus = (request) => {
    if (!request.services?.length) return "Pending";

    if (
      request.services.some(
        (service) => service.status === "REJECTED"
      )
    ) {
      return "Rejected";
    }

    if (
      request.services.every(
        (service) =>
          service.status === "PROVIDER_APPROVED"
      )
    ) {
      return "Approved";
    }

    return "Pending";
  };

  const cards = [

    {
      title: "Departments",
      value: departments.length,
      icon: <ApartmentOutlinedIcon />,
      color: "#7C3AED",
      path: "/super-admin/departments",
    },
    {
      title: "Service Providers",
      value: providers.length,
      icon: <BusinessCenterOutlinedIcon />,
      color: "#EA580C",
      path: "/super-admin/providers",
    },
    {
      title: "Pending Requests",
      value: requests.filter(
        (r) => getRequestStatus(r) === "Pending"
      ).length,
      icon: <PendingActionsOutlinedIcon />,
      color: "#D97706",
      path: "/super-admin/requests",
    },
    {
      title: "Approved",
      value: requests.filter(
        (r) => getRequestStatus(r) === "Approved"
      ).length,
      icon: <CheckCircleOutlineOutlinedIcon />,
      color: "#16A34A",
      path: "/super-admin/requests",
    },
    {
      title: "Rejected",
      value: requests.filter(
        (r) => getRequestStatus(r) === "Rejected"
      ).length,
      icon: <CancelOutlinedIcon />,
      color: "#DC2626",
      path: "/super-admin/requests",
    },
    {
      title: "Total Requests",
      value: requests.length,
      icon: <DescriptionOutlinedIcon />,
      color: "#0F766E",
      path: "/super-admin/requests",
    },
  ];

  const recentRequests = requests.slice(-6).reverse();

  return (
    <Box
  sx={{
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 2.5, md: 3 },
    background: "#F7F8FA",
    minHeight: "100vh",
  }}
>

      {/* CARDS */}
      <Grid container spacing={2} mb={3.5}>
  {cards.map((card) => (
<Grid
  item
  xs={12}
  sm={6}
  md={2}
  key={card.title}
>
      <Paper
        elevation={0}
          onClick={() => navigate(card.path)}

        sx={{
  p: 1.75,
  minHeight: 120,
  borderRadius: "10px",
  border: "1px solid #E4E7EC",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 0.18s ease",
  cursor: "pointer",

  "&:hover": {
    borderColor: "#D0D5DD",
    boxShadow: "0 4px 12px rgba(16, 24, 40, 0.08)",
  },
}}
      >
        {/* TOP */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#475569",
            }}
          >
            {card.title}
          </Typography>

          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              background: `${card.color}12`,
              color: card.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {card.icon}
          </Box>
        </Box>

        {/* VALUE */}
        <Typography
          sx={{
            fontSize: "25px",
            fontWeight: 700,
            color: "#111828",
            lineHeight: 1,
            mt: 1,
          }}
        >
          {card.value}
        </Typography>

        {/* FOOTER */}
       <Typography
  sx={{
    fontSize: "11px",
    color: "#667085",
    mt: 1,
    fontWeight: 500,
  }}
>
  View details →
</Typography>
      </Paper>
    </Grid>
  ))}
</Grid>

      {/* REQUEST TICKETS */}
      <Paper
  elevation={0}
  sx={{
    borderRadius: "10px",
    border: "1px solid #E4E7EC",
    background: "#FFFFFF",
    overflow: "hidden",
  }}
>

        <Box
          px={3}
          py={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={700}
              color="#172B4D"
            >
              Recent Requests
            </Typography>

            <Typography
              fontSize={13}
              color="text.secondary"
            >
              Latest No Due tickets
            </Typography>
          </Box>

          <Button
            size="small"
            onClick={() =>
              navigate("/super-admin/requests")
            }
          >
            View All
          </Button>
        </Box>

        <Divider />

        {recentRequests.length > 0 ? (

          recentRequests.map((request) => {

            const status = getRequestStatus(request);

            return (
              <Box
                key={request.requestId}
                sx={{
                  px: 3,
                  py: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #F0F0F0",
                  cursor: "pointer",

                  "&:hover": {
                    background: "#F8FAFC",
                  },
                }}
                onClick={() =>
                  navigate(
                    `/super-admin/requests/${request.requestId}`
                  )
                }
              >

                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >

                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 1.5,
                      background: "#EAF2FF",
                      color: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                    }}
                  >
                    #
                  </Box>

                  <Box>
                    <Typography
                      fontWeight={700}
                      fontSize={14}
                    >
                      {request.requestId}
                    </Typography>

                    <Typography
                      fontSize={13}
                      color="text.secondary"
                    >
                      {request.employeeName} •{" "}
                      {request.employeeId}
                    </Typography>
                  </Box>

                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={3}
                >

                  <Typography
                    fontSize={13}
                    color="text.secondary"
                  >
                    {request.createdAt || "-"}
                  </Typography>

                  <Chip
                    label={status}
                    size="small"
                    color={
                      status === "Approved"
                        ? "success"
                        : status === "Rejected"
                        ? "error"
                        : "warning"
                    }
                  />

                  <ArrowForwardIosRoundedIcon
                    sx={{
                      fontSize: 15,
                      color: "#9CA3AF",
                    }}
                  />

                </Box>

              </Box>
            );
          })

        ) : (

          <Box
            py={6}
            textAlign="center"
          >
            <Typography color="text.secondary">
              No Requests Found
            </Typography>
          </Box>

        )}

      </Paper>

    </Box>
  );
}

export default Dashboard;
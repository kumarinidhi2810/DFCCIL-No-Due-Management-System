import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
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
  title: "Department Admins",
  value: employees.length,
  icon: <PeopleAltOutlinedIcon />,
  color: "#2563EB",
  path: "/super-admin/department-admins",
},
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
        p: 4,
        background: "#F4F6F8",
        minHeight: "100vh",
      }}
    >

      {/* HEADER */}
      <Box mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="#172B4D"
        >
          Super Admin Dashboard
        </Typography>

       
      </Box>

      {/* CARDS */}
      <Grid container spacing={2.5} mb={4}>
  {cards.map((card) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={card.title}
    >
      <Paper
        elevation={0}
          onClick={() => navigate(card.path)}

        sx={{
          p: 2,
          minHeight: 150,
          borderRadius: 2,
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "0.2s",
          cursor: "pointer",

          "&:hover": {
            borderColor: card.color,
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
             transform: "translateY(-2px)",
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
              fontSize: "14px",
              fontWeight: 600,
              color: "#475569",
            }}
          >
            {card.title}
          </Typography>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              background: `${card.color}15`,
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
            fontSize: "30px",
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1,
            mt: 2,
          }}
        >
          {card.value}
        </Typography>

        {/* FOOTER */}
        <Typography
          sx={{
            fontSize: "12px",
            color: card.color,
            mt: 1,
            fontWeight: 600,
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
        sx={{
          borderRadius: 2,
          border: "1px solid #E5E7EB",
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
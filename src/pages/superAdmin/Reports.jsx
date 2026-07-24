import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

function Reports() {
  const [requests, setRequests] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setRequests(
      JSON.parse(localStorage.getItem("requests") || "[]")
    );

    setDepartments(
      JSON.parse(localStorage.getItem("departments") || "[]")
    );
  }, []);

  const totalRequests = requests.length;
const pending = requests.filter(
  (r) =>
    r.status === "PENDING" ||
    r.status === "DEPT_APPROVED" ||
    r.status === "PROVIDER_APPROVED"
).length;

const approved = requests.filter(
  (r) => r.status === "FINAL_APPROVED"
).length;

const rejected = requests.filter(
  (r) => r.status === "REJECTED"
).length;


  const getPercentage = (value) => {
    if (!totalRequests) return 0;
    return Math.round((value / totalRequests) * 100);
  };

  const departmentReports = departments.map((dept) => {
    const count = requests.filter(
      (req) =>
        req.departmentId === dept.departmentId
    ).length;

    return {
      ...dept,
      total: count,
    };
  });

  const stats = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: <DescriptionOutlinedIcon />,
      color: "#2563EB",
    },
    {
      title: "Pending",
      value: pending,
      icon: <PendingActionsOutlinedIcon />,
      color: "#D97706",
    },
    {
      title: "Approved",
      value: approved,
      icon: <CheckCircleOutlineOutlinedIcon />,
      color: "#059669",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <CancelOutlinedIcon />,
      color: "#DC2626",
    },
  ];

  return (
    <Box
      sx={{
        p: 4,
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >

      {/* HEADER */}
      <Box mb={4}>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#0F172A",
          }}
        >
          Reports & Analytics
        </Typography>

        <Typography
          sx={{
            color: "#64748B",
            mt: 0.5,
          }}
        >
          Monitor No Due request performance and approval activity
        </Typography>
      </Box>

      {/* SUMMARY */}
      <Grid container spacing={2.5} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1.5,
                    background: `${stat.color}15`,
                    color: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#64748B",
                    }}
                  >
                    {stat.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "25px",
                      fontWeight: 700,
                      color: "#0F172A",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>

              </Box>

            </Paper>

          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>

        {/* REQUEST STATUS */}
        <Grid item xs={12} md={5}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
            }}
          >

            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#0F172A",
                mb: 3,
              }}
            >
              Request Status Overview
            </Typography>

            {/* PENDING */}
            <Box mb={2.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.7,
                }}
              >
                <Typography fontSize={14}>
                  Pending
                </Typography>

                <Typography fontSize={14} fontWeight={600}>
                  {pending}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={getPercentage(pending)}
                sx={{
                  height: 7,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#D97706",
                  },
                }}
              />
            </Box>

            {/* APPROVED */}
            <Box mb={2.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.7,
                }}
              >
                <Typography fontSize={14}>
                  Approved
                </Typography>

                <Typography fontSize={14} fontWeight={600}>
                  {approved}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={getPercentage(approved)}
                sx={{
                  height: 7,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#059669",
                  },
                }}
              />
            </Box>

            {/* REJECTED */}
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.7,
                }}
              >
                <Typography fontSize={14}>
                  Rejected
                </Typography>

                <Typography fontSize={14} fontWeight={600}>
                  {rejected}
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={getPercentage(rejected)}
                sx={{
                  height: 7,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#DC2626",
                  },
                }}
              />
            </Box>

          </Paper>

        </Grid>

        {/* DEPARTMENT PERFORMANCE */}
        <Grid item xs={12} md={7}>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
            }}
          >

            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#0F172A",
                mb: 2,
              }}
            >
              Department Request Overview
            </Typography>

            <Table size="small">

              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Department</b>
                  </TableCell>

                  <TableCell>
                    <b>Total Requests</b>
                  </TableCell>

                  <TableCell>
                    <b>Activity</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {departmentReports.map((dept) => (

                  <TableRow key={dept.departmentId} hover>

                    <TableCell>
                      {dept.departmentName}
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>
                        {dept.total}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={
                          dept.total > 0
                            ? "Active"
                            : "No Activity"
                        }
                        size="small"
                        sx={{
                          background:
                            dept.total > 0
                              ? "#DCFCE7"
                              : "#F1F5F9",
                          color:
                            dept.total > 0
                              ? "#166534"
                              : "#64748B",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                  </TableRow>

                ))}

              </TableBody>

            </Table>

          </Paper>

        </Grid>

      </Grid>

      {/* RECENT REQUEST ACTIVITY */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 2,
          border: "1px solid #E2E8F0",
          background: "#FFFFFF",
        }}
      >

        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#0F172A",
            mb: 2,
          }}
        >
          Recent Request Activity
        </Typography>

        {requests.length === 0 ? (

          <Typography
            sx={{
              color: "#64748B",
              py: 3,
              textAlign: "center",
            }}
          >
            No request activity available
          </Typography>

        ) : (

          requests
            .slice(-5)
            .reverse()
            .map((request) => (

              <Box key={request.id}>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1.5,
                  }}
                >

                  <Box>
                    <Typography
                      fontWeight={600}
                      fontSize={14}
                    >
                      {request.requestId || "NO-DUE REQUEST"}
                    </Typography>

                    <Typography
                      fontSize={13}
                      color="text.secondary"
                    >
                      {request.employeeName || "Employee"}
                    </Typography>
                  </Box>

                  <Chip
                   label={
  request.status === "FINAL_APPROVED"
    ? "Approved"
    : request.status === "REJECTED"
    ? "Rejected"
    : "Pending"
}color={
  request.status === "FINAL_APPROVED"
    ? "success"
    : request.status === "REJECTED"
    ? "error"
    : "warning"
}
                  />

                </Box>

                <Divider />

              </Box>

            ))

        )}

      </Paper>

    </Box>
  );
}

export default Reports;
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Typography,
  Box,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
function RequestTable({ requests = [], setRequests }) {
  const navigate = useNavigate();
  const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

  // Department name
  const getDepartmentName = (departmentId) => {
    return (
      departments.find(
        (dept) => dept.departmentId === departmentId
      )?.departmentName || "-"
    );
  };

  // Approve / Reject
  const handleStatusChange = (id, status) => {
    const allRequests =
      JSON.parse(localStorage.getItem("requests")) || [];

    const updated = allRequests.map((req) =>
      req.id === id
        ? { ...req, status }
        : req
    );

    localStorage.setItem(
      "requests",
      JSON.stringify(updated)
    );

    setRequests(updated);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        {/* Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F7FA" }}>
            <TableCell>
              <b>Request ID</b>
            </TableCell>

            <TableCell>
              <b>Employee</b>
            </TableCell>

            <TableCell>
              <b>Department</b>
            </TableCell>

            <TableCell>
              <b>Date</b>
            </TableCell>

            <TableCell>
              <b>Status</b>
            </TableCell>

            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <TableRow hover key={req.id}>
                <TableCell>
                  {req.requestId || "-"}
                </TableCell>

                <TableCell>
                  {req.employeeName || "-"}
                </TableCell>

                <TableCell>
                  {getDepartmentName(req.departmentId)}
                </TableCell>

                <TableCell>
                  {req.createdAt || "-"}
                </TableCell>

                <TableCell>
                  <Chip
                    label={
                      req.status === "FINAL_APPROVED"
                        ? "Approved"
                        : req.status === "REJECTED"
                        ? "Rejected"
                        : "Pending"
                    }
                    size="small"
                    color={
                      req.status === "FINAL_APPROVED"
                        ? "success"
                        : req.status === "REJECTED"
                        ? "error"
                        : "warning"
                    }
                  />
                </TableCell>

                <TableCell align="center">
                  {/* Approve */}
                  <IconButton
                    color="success"
                    onClick={() =>
                      handleStatusChange(
                        req.id,
                        "FINAL_APPROVED"
                      )
                    }
                  >
                    <CheckCircleIcon />
                  </IconButton>

                  {/* Reject */}
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleStatusChange(
                        req.id,
                        "REJECTED"
                      )
                    }
                  >
                    <CancelOutlinedIcon />
                  </IconButton>

                  {/* View */}
                 <IconButton
  color="primary"
  onClick={() =>
    navigate(`/super-admin/requests/${req.requestId}`)
  }
>
  <VisibilityOutlinedIcon />
</IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Box
                  sx={{
                    py: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography color="text.secondary">
                    No Requests Found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default RequestTable;
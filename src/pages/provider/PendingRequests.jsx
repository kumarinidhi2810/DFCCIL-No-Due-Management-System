import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
} from "@mui/material";

function PendingRequests() {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user")) || {};

const allRequests =
  JSON.parse(localStorage.getItem("requests")) || [];

const requests = [];

allRequests.forEach((request) => {
  request.services?.forEach((service) => {
    if (
      service.providerId === user.providerId &&
      service.status === "DEPT_APPROVED"
    ) {
      requests.push({
        requestId: request.requestId,
        employeeName: request.employeeName,
        employeeId: request.employeeId,
        serviceId: service.serviceId,
        serviceName: service.serviceName,
         department: request.department,
  departmentId: request.departmentId,
        appliedDate: request.createdAt,
        status: service.status,
      });
    }
  });
});

  return (
    <Box
      sx={{
        p: 4,
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Pending Requests
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Review and process pending service requests.
      </Typography>

      <Paper
  elevation={3}
  sx={{
    borderRadius: 3,
    overflowX: "auto",
    width: "100%",
  }}
>
        <Table>

          <TableHead>
            <TableRow
              sx={{
                background: "#F3F4F6",
              }}
            >
              <TableCell><b>Request ID</b></TableCell>

              <TableCell><b>Employee Name</b></TableCell>

              <TableCell><b>Employee ID</b></TableCell>

              <TableCell><b>Service</b></TableCell>

              <TableCell><b>Applied Date</b></TableCell>

              <TableCell><b>Status</b></TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>

            </TableRow>
          </TableHead>
<TableBody>
  {requests.length > 0 ? (
    requests.map((request) => (
<TableRow
  key={`${request.requestId}-${request.serviceId}`}
  hover
>        <TableCell>{request.requestId}</TableCell>
        <TableCell>{request.employeeName}</TableCell>
        <TableCell>{request.employeeId}</TableCell>
        <TableCell>{request.serviceName}</TableCell>
        <TableCell>{request.appliedDate}</TableCell>

        <TableCell>
          <Chip
            label={request.status}
            color="warning"
            size="small"
          />
        </TableCell>

        <TableCell align="center">
          <Button
  variant="contained"
  size="small"
  onClick={() =>
    navigate(
      `/provider/view/${request.requestId}/${request.serviceId}`
    )
  }
>
  View
</Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} align="center">
        No Pending Requests Found
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </Paper>
    </Box>
  );
}

export default PendingRequests;
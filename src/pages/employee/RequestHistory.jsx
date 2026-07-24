import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function RequestHistory() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
const [selectedRequest, setSelectedRequest] = useState(null);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  const allRequests =
    JSON.parse(localStorage.getItem("requests")) || [];

  const myRequests = allRequests.filter(
    (request) =>
      request.employeeId?.toLowerCase() ===
      user.employeeId?.toLowerCase()
  );

  setRequests(myRequests);
}, []);

const getStatusColor = (status) => {
  switch (status) {
    case "FINAL_APPROVED":
      return "success";

    case "REJECTED":
      return "error";

    default:
      return "warning";
  }
};

  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700}>
        Request History
      </Typography>

      <Typography color="text.secondary" mb={4}>
        View all your submitted No Due requests.
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Request ID</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Employee</b></TableCell>
              <TableCell><b>Request Type</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>{request.requestId}</TableCell>

                  <TableCell>{request.createdAt}</TableCell>

                  <TableCell>{request.employeeName}</TableCell>

                  <TableCell>{request.requestType}</TableCell>

                  <TableCell>
                    <Chip
                      label={request.status}
                      color={getStatusColor(request.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">
                   <Button
  variant="outlined"
  size="small"
  onClick={() => {
        console.log(request);

    setSelectedRequest(request);
    setOpen(true);
  }}
>
  View
</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Requests Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Request Details</DialogTitle>

  <DialogContent>
    {selectedRequest && (
      <Box>

        <Typography>
          <b>Request ID:</b> {selectedRequest.requestId}
        </Typography>

        <Typography mt={1}>
          <b>Employee:</b> {selectedRequest.employeeName}
        </Typography>

        <Typography mt={1}>
          <b>Date:</b> {selectedRequest.createdAt}
        </Typography>

        <Typography mt={1}>
          <b>Request Type:</b> {selectedRequest.requestType}
        </Typography>

        <Typography mt={1}>
          <b>Status:</b> {selectedRequest.status}
        </Typography>

        <Typography mt={3} fontWeight={700}>
          Service Status
        </Typography>

<Typography mt={3} fontWeight={700}>
Department / Service Status
</Typography>

{selectedRequest.services?.map((service) => (
  <Paper
    key={service.serviceId}
    sx={{
      mt: 2,
      p: 2,
      borderRadius: 2,
      background: "#FAFAFA",
    }}
  >
    <Typography>
      <b>Service :</b> {service.serviceName}
    </Typography>

    <Typography>
      <b>Status :</b> {service.status}
    </Typography>

    <Typography>
      <b>Approved By :</b>{" "}
      {service.approvedBy || "-"}
    </Typography>

    <Typography>
      <b>Approved Date :</b>{" "}
      {service.approvedDate || "-"}
    </Typography>

    <Typography>
      <b>Remarks :</b>{" "}
      {service.remarks || "-"}
    </Typography>

    <Chip
      sx={{ mt: 1 }}
      label={service.status}
      color={
        service.status === "PROVIDER_APPROVED"
          ? "success"
          : service.status === "REJECTED"
          ? "error"
          : "warning"
      }
    />
  </Paper>
))}

      </Box>
    )}
  </DialogContent>

<DialogActions>

  {selectedRequest?.status === "FINAL_APPROVED" && (
    <Button
      variant="contained"
      color="success"
      onClick={() => navigate("/employee/certificate")}
    >
      Download Certificate
    </Button>
  )}

  <Button onClick={() => setOpen(false)}>
    Close
  </Button>

</DialogActions>
</Dialog>
    </Box>
  );
}

export default RequestHistory;
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
const requests = [];

function ApprovedRequests() {
  return (
    <Box
      sx={{
        p: 4,
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" fontWeight={700}>
        Approved Requests
      </Typography>

      <Typography color="text.secondary" mb={4}>
        List of all approved service requests.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>

          <TableHead>
            <TableRow sx={{ background: "#F3F4F6" }}>
              <TableCell><b>Request ID</b></TableCell>
              <TableCell><b>Employee Name</b></TableCell>
              <TableCell><b>Employee ID</b></TableCell>
              <TableCell><b>Service</b></TableCell>
              <TableCell><b>Approved Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Remarks</b></TableCell>
              <TableCell align="center"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
<TableBody>
  {requests.length > 0 ? (
    requests.map((request) => (
      <TableRow key={request.id} hover>
        <TableCell>{request.id}</TableCell>
        <TableCell>{request.employeeName}</TableCell>
        <TableCell>{request.employeeId}</TableCell>
        <TableCell>{request.service}</TableCell>
        <TableCell>{request.appliedDate}</TableCell>

        <TableCell>
          <Chip
            label={request.status}
            color="warning"
            size="small"
          />
        </TableCell>

        <TableCell align="center">
          <Button variant="contained" size="small">
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

export default ApprovedRequests;
import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

function RecentRequests({requests}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
  const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

  const data = requests.map((request) => ({
    ...request,
    departmentName:
      departments.find(
        (dept) =>
          dept.departmentId ===
          request.services?.[0]?.departmentId
      )?.departmentName || "-",
  }));

  setRows(data);
}, [requests]);

  const getStatus = (row) => {
    if (
      row.status === "FINAL_APPROVED" ||
      row.departmentStatus === "DEPT_APPROVED"
    ) {
      return {
        label: "Approved",
        color: "success",
      };
    }

    if (
      row.status === "REJECTED" ||
      row.departmentStatus === "REJECTED"
    ) {
      return {
        label: "Rejected",
        color: "error",
      };
    }

    return {
      label: "Pending",
      color: "warning",
    };
  };

  return (
    <Paper sx={{ mt: 4, borderRadius: 4, p: 3 }}>
      <Typography variant="h6" mb={2} fontWeight={600}>
        Recent No Due Requests
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Employee</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.requestId}>
                <TableCell>{row.requestId}</TableCell>

                <TableCell>{row.employeeName}</TableCell>

                <TableCell>{row.departmentName}</TableCell>

                <TableCell>
                <Chip
  label={
    row.status === "FINAL_APPROVED"
      ? "Approved"
      : row.status === "REJECTED"
      ? "Rejected"
      : "Pending"
  }
  color={
    row.status === "FINAL_APPROVED"
      ? "success"
      : row.status === "REJECTED"
      ? "error"
      : "warning"
  }
/>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No Requests Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default RecentRequests;
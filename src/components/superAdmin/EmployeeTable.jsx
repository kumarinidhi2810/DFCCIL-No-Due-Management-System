import { useEffect, useState } from "react";
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
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onView,
}) {
  const [departments, setDepartments] = useState([]);

useEffect(() => {
  setDepartments(
    JSON.parse(localStorage.getItem("departments")) || []
  );
}, []);
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>

        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ background: "#F5F5F5" }}>
            <TableCell><b>Employee ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow hover key={employee.id}>

                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.name}</TableCell>
             <TableCell>
  {
    departments.find(
      (dept) => dept.departmentId === employee.departmentId
    )?.departmentName || "-"
  }
</TableCell>
                <TableCell>{employee.email}</TableCell>

                {/* STATUS */}
                <TableCell>
                  <Chip
                    label={employee.status || "Active"}
                    color={employee.status === "Inactive" ? "error" : "success"}
                    size="small"
                  />
                </TableCell>

                {/* ACTIONS */}
                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => onView(employee)}
                  >
                    <VisibilityOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    onClick={() => onEdit(employee)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(employee.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography py={3} color="text.secondary">
                  No Employees Found
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </Paper>
  );
}

export default EmployeeTable;
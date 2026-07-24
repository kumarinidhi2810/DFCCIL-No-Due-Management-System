import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import EmployeeTable from "../../components/employees/EmployeeTable";

function Employees() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

const [employees, setEmployees] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("employees")) || [];

  return saved.filter(
    (emp) => emp.departmentId === user.departmentId
  );
});
  
 


  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Employees
          </Typography>

          <Typography color="text.secondary">
            Manage department employees
          </Typography>
        </Box>
      </Box>
   <EmployeeTable
  employees={employees}
/>
    </Box>
  );
}

export default Employees;
import { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import EmployeeTable from "../../components/superAdmin/EmployeeTable";
import AddEmployeeDialog from "../../components/superAdmin/AddEmployeeDialog";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
const handleOpen = () => {
  setEditEmployee(null); 
  setOpen(true);
};

  const handleClose = () => {
    setOpen(false);
    setEditEmployee(null);
  };

  //  FILTER
  const filteredEmployees = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase()) ||
    emp.email?.toLowerCase().includes(search.toLowerCase())
  );

const handleDelete = (id) => {
  const updated = employees.filter((emp) => emp.id !== id);
  setEmployees(updated);
  localStorage.setItem("employees", JSON.stringify(updated));
};

  // EDIT
  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setOpen(true);
  };
  

useEffect(() => {
  console.log("Employees Page Mounted");

  const data = JSON.parse(localStorage.getItem("employees") || "[]");

  console.log("LocalStorage Data:", data);

  setEmployees(data);
}, []);

  // VIEW
  const handleView = (emp) => {
    console.log(emp);
  };

  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>

      <Typography variant="h4" fontWeight={700}>
        Employee 
      </Typography>

      

    

        <Grid item xs={12} md={6} textAlign="right">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Add Employee
          </Button>
        </Grid>

      

      {/* TABLE */}
      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {/* DIALOG */}
      <AddEmployeeDialog
        open={open}
        handleClose={handleClose}
        employees={employees}
        setEmployees={setEmployees}
        editEmployee={editEmployee}   // 🔥 important for next step
      />

    </Box>
  );
}

export default Employees;
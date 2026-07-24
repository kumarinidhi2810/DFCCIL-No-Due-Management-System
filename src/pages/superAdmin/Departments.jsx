import { useState, useEffect } from "react";
import DepartmentTable from "../../components/superAdmin/DepartmentTable";
import AddDepartmentDialog from "../../components/superAdmin/AddDepartmentDialog";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

function Departments() {
const [departments, setDepartments] = useState(() => {
  return JSON.parse(localStorage.getItem("departments")) || [];
});

useEffect(() => {
  localStorage.setItem(
    "departments",
    JSON.stringify(departments)
  );
}, [departments]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editDepartment, setEditDepartment] = useState(null);
  const handleOpen = () => setOpen(true);
  
const filteredDepartments = departments.filter((dept) =>
  dept.departmentName
    ?.toLowerCase()
    .includes(search.toLowerCase())
);

const handleDelete = (departmentId) => {
  const updated = departments.filter(
    (dept) => dept.departmentId !== departmentId
  );

  setDepartments(updated);
};
const handleEdit = (dept) => {
  setEditDepartment(dept);
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
  setEditDepartment(null);
};


  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>

      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        Departments Management
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage all departments of organization.
      </Typography>

    

        <Grid item xs={12} md={6} textAlign="right">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
          >
            Add Department
          </Button>
        </Grid>

      
      <DepartmentTable
  departments={filteredDepartments}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<AddDepartmentDialog
  open={open}
  handleClose={handleClose}
  departments={departments}
  setDepartments={setDepartments}
  editDepartment={editDepartment}
/>

    </Box>
  );
}

export default Departments;
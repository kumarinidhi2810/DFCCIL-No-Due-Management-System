import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function AddEmployeeDialog({
  open,
  handleClose,
  employees,
  setEmployees,
  editEmployee,
}) {
  const [formData, setFormData] = useState({
    
    name: "",
    email: "",
    password:"",
    designation: "",
    departmentId: "",
    status: "Active",
  });
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  //  Prefill for Edit
  useEffect(() => {
  if (editEmployee) {
    setFormData(editEmployee);
  } else {
    const nextEmployeeId =
      "EMP" +
      String((employees?.length || 0) + 1).padStart(2, "0");

    setFormData({
      employeeId: nextEmployeeId,
      name: "",
      email: "",
      password: "",
      designation: "",
      departmentId: "",
      status: "Active",
    });
  }
}, [editEmployee, open, employees]);
  useEffect(() => {
  const data = JSON.parse(localStorage.getItem("departments") || "[]");
  setDepartments(data);
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = () => {
  let updatedEmployees = [];

  if (editEmployee) {
    updatedEmployees = employees.map((emp) =>
      emp.id === editEmployee.id
        ? {
            ...formData,
            employeeId: editEmployee.employeeId,
            id: editEmployee.id,
          }
        : emp
    );
  } else {
    const lastEmployeeNumber = employees.reduce(
      (max, emp) => {
        const number = parseInt(
          emp.employeeId?.replace("EMP", "")
        );

        return number > max ? number : max;
      },
      0
    );

    const newEmployeeId = `EMP${String(
      lastEmployeeNumber + 1
    ).padStart(2, "0")}`;

    updatedEmployees = [
      ...employees,
      {
        ...formData,
        employeeId: newEmployeeId,
        id: Date.now(),
      },
    ];
  }

  setEmployees(updatedEmployees);

  localStorage.setItem(
    "employees",
    JSON.stringify(updatedEmployees)
  );

  console.log("Saved:", updatedEmployees);

  handleClose();
};

 

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

      <DialogTitle>
        {editEmployee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
 <TextField
  fullWidth
  label="Employee ID"
  name="employeeId"
  value={formData.employeeId}
  disabled
/>
</Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

    
<Grid item xs={12}>
  <TextField
    fullWidth
    label="Password"
    name="password"
    type={showPassword ? "text" : "password"}
    value={formData.password}
    onChange={handleChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
</Grid>

<Grid item xs={12}>
  <TextField
    fullWidth
    label="Designation"
    name="designation"
    value={formData.designation}
    onChange={handleChange}
  />
</Grid>
<Grid item xs={12}>
  <TextField
    select
    fullWidth
    label="Department"
    name="departmentId"
    value={formData.departmentId}
    onChange={handleChange}
  >
    {departments.map((dept) => (
  <MenuItem
    key={dept.departmentId}
    value={dept.departmentId}
  >
    {dept.departmentName}
  </MenuItem>
))}
  </TextField>
</Grid>
</Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editEmployee ? "Update" : "Add"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default AddEmployeeDialog;
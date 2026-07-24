import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

function AddEmployeeDialog({
  open,
  handleClose,
  employees,
  setEmployees,
  editEmployee,
}) {
  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    departmentId: "",
    designation: "",
    email: "",
    mobile: "",
    joiningDate: "",
    status: "Active",
  });
  const departments = JSON.parse(
  localStorage.getItem("departments") || "[]"
);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !employee.employeeId ||
      !employee.name ||
      !employee.departmentId ||
      !employee.email
    ) {
      alert("Please fill all required fields.");
      return;
    }

      if (editEmployee) {
    const updatedEmployees = employees.map((emp) =>
      emp.id === editEmployee.id
        ? { ...employee, id: editEmployee.id }
        : emp
    );

    setEmployees(updatedEmployees);
  } else {
    setEmployees([
      ...employees,
      {
        id: Date.now(),
        ...employee,
      },
    ]);
  }

    setEmployee({
      employeeId: "",
      name: "",
      departmentId: "",
      designation: "",
      email: "",
      mobile: "",
      joiningDate: "",
      status: "Active",
    });

    handleClose();
  };
useEffect(() => {
  if (editEmployee) {
    setEmployee(editEmployee);
  } else {
    setEmployee({
      employeeId: "",
      name: "",
      departmentId: "",
      designation: "",
      email: "",
      mobile: "",
      joiningDate: "",
      status: "Active",
    });
  }
}, [editEmployee, open]);

const handleSubmit = () => {
  let updatedEmployees = [];

  if (editEmployee) {
    updatedEmployees = employees.map((emp) =>
      emp.id === editEmployee.id
        ? { ...formData, id: editEmployee.id }
        : emp
    );
  } else {
    updatedEmployees = [
      ...employees,
      {
        ...formData,
        id: Date.now(),
      },
    ];
  }

  console.log("Old Employees:", employees);
  console.log("New Employees:", updatedEmployees);

  setEmployees(updatedEmployees);

  localStorage.setItem(
    "employees",
    JSON.stringify(updatedEmployees)
  );

  handleClose();
};
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Add Employee
      </DialogTitle>

      <DialogContent>

        <Grid container spacing={2} mt={1}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee Name"
              name="name"
              value={employee.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
           <TextField
  select
  fullWidth
  label="Department"
  name="departmentId"
  value={employee.departmentId}
  onChange={handleChange}
>
  {departments.map((dept) => (
    <MenuItem
      key={dept.id}
      value={dept.deptId}
    >
      {dept.name}
    </MenuItem>
  ))}
</TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={employee.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={employee.mobile}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              label="Joining Date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={employee.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">
                Active
              </MenuItem>

              <MenuItem value="Inactive">
                Inactive
              </MenuItem>
            </TextField>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddEmployeeDialog;
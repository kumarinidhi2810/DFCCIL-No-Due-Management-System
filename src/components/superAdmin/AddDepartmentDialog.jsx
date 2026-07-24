import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

function AddDepartmentDialog({
  open,
  handleClose,
  departments,
  setDepartments,
  editDepartment,
}) {
  const [formData, setFormData] = useState({
    departmentId: "",
    departmentName: "",
    status: "Active",
  });

  // Prefill for Edit
  useEffect(() => {
    if (editDepartment) {
      setFormData({
        departmentId: editDepartment.departmentId || "",
        departmentName: editDepartment.departmentName || "",
        status: editDepartment.status || "Active",
      });
    } else {
      setFormData({
        departmentId: "",
        departmentName: "",
        status: "Active",
      });
    }
  }, [editDepartment, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.departmentId ||
      !formData.departmentName
    ) {
      alert("Please fill all required fields");
      return;
    }

    let updatedDepartments = [];

    if (editDepartment) {
      updatedDepartments = departments.map((dept) =>
        dept.departmentId === editDepartment.departmentId
          ? {
              ...formData,
            }
          : dept
      );
    } else {
      updatedDepartments = [
        ...departments,
        {
          ...formData,
        },
      ];
    }

    setDepartments(updatedDepartments);

    localStorage.setItem(
      "departments",
      JSON.stringify(updatedDepartments)
    );

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {editDepartment
          ? "Edit Department"
          : "Add Department"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department ID"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department Name"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
            />
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {editDepartment ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDepartmentDialog;
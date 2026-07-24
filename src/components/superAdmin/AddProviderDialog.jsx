import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

function AddProviderDialog({
  open,
  handleClose,
  providers,
  setProviders,
  editProvider,
}) {
  const [departments, setDepartments] = useState([]);

 const initialState = {
  providerId: "",
  name: "",
  email: "",
  password: "",
  departmentId: "",
  role: "provider",
  status: "Active",
};

  const [formData, setFormData] = useState({
  providerId: "",
  name: "",
  departmentId: "",
  email: "",
  status: "Active",
});

  // Load Departments
  useEffect(() => {
    const savedDepartments =
      JSON.parse(localStorage.getItem("departments")) || [];

    setDepartments(savedDepartments);
  }, []);

  // Add / Edit
  useEffect(() => {
    if (editProvider) {
      setFormData(editProvider);
    } else {
      setFormData(initialState);
    }
  }, [editProvider, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
  !formData.name ||
  !formData.email ||
  !formData.password ||
  !formData.departmentId
) {
  alert("Please fill all fields");
  return;
}
    let updatedProviders = [];

    if (editProvider) {
      // UPDATE
      updatedProviders = providers.map((provider) =>
        provider.id === editProvider.id ? formData : provider
      );
    } else {
      // AUTO Provider ID
      const providerId = `PROV${String(
        providers.length + 1
      ).padStart(3, "0")}`;

      const newProvider = {
        ...formData,
        id: Date.now(),
        providerId,
        role:"provider",
      };

      updatedProviders = [...providers, newProvider];
    }

    setProviders(updatedProviders);

    localStorage.setItem(
      "providers",
      JSON.stringify(updatedProviders)
    );

    handleClose();
    setFormData(initialState);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">

      <DialogTitle>
        {editProvider ? "Edit Provider" : "Add Provider"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>

          {/* Provider ID */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Provider ID"
              value={
                editProvider
                  ? formData.providerId
                  : `PROV${String(providers.length + 1).padStart(3, "0")}`
              }
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Provider Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          {/* Department */}
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

          {/* Email */}
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
    type="password"
    value={formData.password}
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
          {editProvider ? "Update" : "Add"}
        </Button>
      </DialogActions>

    </Dialog>
  );
}

export default AddProviderDialog;
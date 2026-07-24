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

function AddProviderDialog({
  open,
  handleClose,
  providers,
  setProviders,
  editProvider,
}) {
  const [provider, setProvider] = useState({
    providerId: "",
    name: "",
    department: "",
    service: "",
    email: "",
    status: "Active",
  });

  useEffect(() => {
    if (editProvider) {
      setProvider(editProvider);
    } else {
      setProvider({
        providerId: "",
        name: "",
        department: "",
        service: "",
        email: "",
        status: "Active",
      });
    }
  }, [editProvider, open]);

  const handleChange = (e) => {
    setProvider({
      ...provider,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (
      !provider.providerId ||
      !provider.name ||
      !provider.department ||
      !provider.service ||
      !provider.email
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editProvider) {
      const updatedProviders = providers.map((item) =>
        item.id === editProvider.id
          ? { ...provider, id: editProvider.id }
          : item
      );

      setProviders(updatedProviders);
    } else {
      setProviders([
        ...providers,
        {
          id: Date.now(),
          ...provider,
        },
      ]);
    }

    setProvider({
      providerId: "",
      name: "",
      department: "",
      service: "",
      email: "",
      status: "Active",
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {editProvider ? "Edit Service Provider" : "Add Service Provider"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Provider ID"
              name="providerId"
              value={provider.providerId}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Provider Name"
              name="name"
              value={provider.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={provider.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Service"
              name="service"
              value={provider.service}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={provider.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={provider.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {editProvider ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProviderDialog;
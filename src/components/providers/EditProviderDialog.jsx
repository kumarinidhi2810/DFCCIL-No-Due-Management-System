import { useEffect, useState } from "react";
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

function EditProviderDialog({
  open,
  handleClose,
  selectedProvider,
  providers,
  setProviders,
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
    if (selectedProvider) {
      setProvider(selectedProvider);
    }
  }, [selectedProvider]);

  const handleChange = (e) => {
    setProvider({
      ...provider,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {

    const updatedProviders = providers.map((item) =>
      item.id === provider.id ? provider : item
    );

    setProviders(updatedProviders);

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >

      <DialogTitle>Edit Provider</DialogTitle>

      <DialogContent>

        <Grid container spacing={2} mt={1}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Provider ID"
              name="providerId"
              value={provider.providerId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Provider Name"
              name="name"
              value={provider.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={provider.department}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Service"
              name="service"
              value={provider.service}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={provider.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
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
          onClick={handleUpdate}
        >
          Update
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default EditProviderDialog;
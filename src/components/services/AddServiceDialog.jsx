import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";


function AddServiceDialog({
    open,
    handleClose,
    services,
    setServices,
    editingService,
}) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const [formData, setFormData] = useState({
  serviceName: "",
  providerId: "",
  description: "",
  status: "Active",
});

const [providers, setProviders] = useState([]);
useEffect(() => {
  if (open) {
    const allProviders =
      JSON.parse(localStorage.getItem("providers")) || [];


    const departmentProviders = allProviders.filter(
      (provider) => provider.departmentId === user.departmentId
    );
    console.log("All Providers:", allProviders);

         console.log("Current User:", user);


    console.log("Department Providers:", departmentProviders);

    setProviders(departmentProviders);
  }
}, [open]);
useEffect(() => {
  if (editingService) {
    setFormData({
      serviceName: editingService.serviceName,
      providerId: editingService.providerId,
      description: editingService.description,
      status: editingService.status,
    });
  } else {
    setFormData({
      serviceName: "",
      providerId: "",
      description: "",
      status: "Active",
    });
  }
}, [editingService, open]);
const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSave = () => {
if (!formData.serviceName || !formData.providerId) {
  alert("Please fill all required fields.");
  return;
} 
const selectedProvider = providers.find(
  (provider) => provider.providerId === formData.providerId
);
const newService = {
  serviceId: "SER" + Date.now(),

  serviceName: formData.serviceName,

  departmentId: selectedProvider.departmentId,

  providerId: selectedProvider.providerId,

  providerName: selectedProvider.name,

  description: formData.description,

  status: formData.status,

  createdOn: new Date().toLocaleDateString(),
};
const allServices =
  JSON.parse(localStorage.getItem("services")) || [];

const updatedServices = [...allServices, newService];

localStorage.setItem(
  "services",
  JSON.stringify(updatedServices)
);

setServices(
  updatedServices.filter(
    (service) => service.departmentId === user.departmentId
  )
);
  

  setFormData({
    serviceName: "",
    providerId: "",
    description: "",
    status: "Active",
  });

  handleClose();
 



};
console.log("Logged User:", user);
console.log("Providers:", providers);

const filteredProviders = providers;

console.log("Filtered Providers:", filteredProviders);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add New Service</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Service Name"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
 <TextField
  select
  fullWidth
  label="Service Provider"
  name="providerId"
  value={formData.providerId}
  onChange={handleChange}
>
  {filteredProviders.map((provider) => (
    <MenuItem
      key={provider.providerId}
      value={provider.providerId}
    >
      {provider.name} 
    </MenuItem>
  ))}
</TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Service
        </Button>
      </DialogActions>
    </Dialog>
  );

}
export default AddServiceDialog;
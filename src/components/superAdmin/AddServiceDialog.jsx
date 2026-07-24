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

function AddServiceDialog({
  open,
  handleClose,
  services,
  setServices,
  editService,
}) {
  
  const initialState = {
    serviceId: "",
    name: "",
    category: "",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialState);

  // Prefill form when editing
  useEffect(() => {
    if (editService) {
      setFormData(editService);
    } else {
      setFormData(initialState);
    }
  }, [editService, open]);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Add / Update Service
  const handleSubmit = () => {
    if (
      !formData.serviceId.trim() ||
      !formData.name.trim() ||
      !formData.category.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editService) {
      const updatedServices = services.map((service) =>
        service.id === editService.id
          ? { ...formData, id: editService.id }
          : service
      );

      setServices(updatedServices);
    } else {
      const newService = {
        ...formData,
        id: Date.now(),
      };

      setServices([...services, newService]);
    }

    setFormData(initialState);
    handleClose();
  };
  console.log("Providers State:", providers);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editService ? "Edit Service" : "Add Service"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service ID"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Service Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={() => {
            setFormData(initialState);
            handleClose();
          }}
        >
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit}>
          {editService ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddServiceDialog;
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import ServiceTable from "../../components/services/ServiceTable";
import AddServiceDialog from "../../components/services/AddServiceDialog";

function Services() {
const user = JSON.parse(localStorage.getItem("user") || "{}");

const [services, setServices] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("services")) || [];
  return saved.filter(
    (service) => service.departmentId === user.departmentId
  );
});

  const [open, setOpen] = useState(false);
  



  const handleAdd = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setEditingService(null);
};
const [editingService, setEditingService] = useState(null);
const handleEdit = (service) => {
  setEditingService(service);
  setOpen(true);
};
const handleDelete = (serviceId) => {
  if (!window.confirm("Delete this service?")) return;

  const allServices =
    JSON.parse(localStorage.getItem("services")) || [];

  const updatedServices = allServices.filter(
    (service) => service.serviceId !== serviceId
  );

  localStorage.setItem(
    "services",
    JSON.stringify(updatedServices)
  );

  setServices(
    updatedServices.filter(
      (service) => service.departmentId === user.departmentId
    )
  );

};


  return (
    <Box
      sx={{
        p: 4,
        background: "#f5f7fb",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Services
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage all department services
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleAdd}
          sx={{
            borderRadius: 2,
            textTransform: "none",
          }}
        >
          Add Service
        </Button>
      </Box>

      {/* Table */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <ServiceTable
  services={services}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
      </Paper>

      {/* Dialog */}
   <AddServiceDialog
  open={open}
  handleClose={handleClose}
  services={services}
  setServices={setServices}
  editingService={editingService}
/>

    </Box>
  );
}

export default Services;
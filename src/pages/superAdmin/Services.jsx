import { useState,useEffect} from "react";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ServiceTable from "../../components/superAdmin/ServiceTable";
import AddServiceDialog from "../../components/superAdmin/AddServiceDialog";

function Services() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editService, setEditService] = useState(null);

  const handleOpen = () => {
    setEditService(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditService(null);
  };

  //  EDIT
  const handleEdit = (srv) => {
    setEditService(srv);
    setOpen(true);
  };

  //  DELETE
  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  //  SEARCH FILTER
  const filteredServices = services.filter((srv) =>
    srv.name?.toLowerCase().includes(search.toLowerCase()) ||
    srv.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>

      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        Services Management
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage organization services
      </Typography>

      {/* SEARCH + BUTTON */}
      <Grid container spacing={2} mb={3} alignItems="center">

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search Services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} textAlign="right">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Add Service
          </Button>
        </Grid>

      </Grid>

      {/* TABLE */}
      <ServiceTable
        services={filteredServices}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* DIALOG */}
      <AddServiceDialog
        open={open}
        handleClose={handleClose}
        services={services}
        setServices={setServices}
        editService={editService}
      />

    </Box>
  );
}

export default Services;
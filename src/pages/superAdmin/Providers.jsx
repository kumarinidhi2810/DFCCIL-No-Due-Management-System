import { useState, useEffect } from "react";

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

import ProviderTable from "../../components/superAdmin/ProviderTable";
import AddProviderDialog from "../../components/superAdmin/AddProviderDialog";

function Providers() {
const [providers, setProviders] = useState(() => {
  return JSON.parse(localStorage.getItem("providers")) || [];
});
useEffect(() => {
  localStorage.setItem(
    "providers",
    JSON.stringify(providers)
  );
}, [providers]);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [editProvider, setEditProvider] = useState(null);

  //  OPEN (ADD MODE)
  const handleOpen = () => {
    setEditProvider(null);
    setOpen(true);
  };

  //  CLOSE
  const handleClose = () => {
    setOpen(false);
    setEditProvider(null);
  };

  //  EDIT
  const handleEdit = (provider) => {
    setEditProvider(provider);
    setOpen(true);
  };

const handleDelete = (id) => {
  const updatedProviders = providers.filter((p) => p.id !== id);

  setProviders(updatedProviders);

  localStorage.setItem(
    "providers",
    JSON.stringify(updatedProviders)
  );
};

const filteredProviders = providers.filter((provider) => {
  return (
    provider.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    provider.email
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    provider.providerId
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
});


  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>

      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        Providers Management
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage all service providers of organization
      </Typography>

        <Grid item xs={12} md={6} textAlign="right">
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleOpen}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Add Provider
          </Button>
        </Grid>

      

      {/* TABLE */}
      <ProviderTable
        providers={filteredProviders}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* DIALOG */}
      <AddProviderDialog
        open={open}
        handleClose={handleClose}
        providers={providers}
        setProviders={setProviders}
        editProvider={editProvider}
      />

    </Box>
  );
}

export default Providers;
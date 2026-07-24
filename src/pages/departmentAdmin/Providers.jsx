import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";

import ProviderTable from "../../components/providers/ProviderTable";
import AddProviderDialog from "../../components/providers/AddProviderDialog";

function Providers() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

 const [providers, setProviders] = useState(() => {
  const allProviders =
    JSON.parse(localStorage.getItem("providers")) || [];

  return allProviders.filter(
    (provider) => provider.departmentId === user.departmentId
  );
});

  const [open, setOpen] = useState(false);
const handleDelete = (providerId) => {
  if (!window.confirm("Delete this provider?")) return;

  const allProviders =
    JSON.parse(localStorage.getItem("providers")) || [];

  const updatedProviders = allProviders.filter(
    (provider) => provider.providerId !== providerId
  );

  localStorage.setItem(
    "providers",
    JSON.stringify(updatedProviders)
  );

  setProviders(
    updatedProviders.filter(
      (provider) => provider.departmentId === user.departmentId
    )
  );
};


 

  return (
    <Box sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Service Providers
          </Typography>

          <Typography color="text.secondary">
            Manage department service providers
          </Typography>
        </Box>

     
      </Box>

      <ProviderTable
        providers={providers}
        onDelete={handleDelete}
      />

      <AddProviderDialog
        open={open}
        handleClose={() => setOpen(false)}
        providers={providers}
        setProviders={setProviders}
      />
    </Box>
  );
}

export default Providers;
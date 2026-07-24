import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function ServiceTable({
  services = [],
  onEdit = () => {},
  onDelete = () => {},
}) {
  const [departments, setDepartments] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setDepartments(
      JSON.parse(localStorage.getItem("departments")) || []
    );

    setProviders(
      JSON.parse(localStorage.getItem("providers")) || []
    );
  }, []);

  const rows = services.map((service) => ({
    ...service,
    id: service.serviceId || service.id,
  }));

  const columns = [
    {
      field: "serviceName",
      headerName: "Service",
      flex: 1.5,
    },

 {
  field: "departmentId",
  headerName: "Department",
  flex: 1.2,
  renderCell: (params) => {
    const dept = departments.find(
      (d) =>
        String(d.departmentId).trim() ===
        String(params.value).trim()
    );

    return dept?.departmentName || "-";
  },
},

    {
      field: "providerId",
      headerName: "Provider",
      flex: 1.2,
      renderCell: (params) => {
        const provider = providers.find(
          (p) => p.providerId === params.value
        );

        return provider ? provider.name : "-";
      },
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "Active"
              ? "success"
              : "error"
          }
        />
      ),
    },

    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              size="small"
              onClick={() => onEdit(params.row)}
            >
              <EditRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              size="small"
              onClick={() =>
                onDelete(params.row.serviceId)
              }
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        localeText={{
          noRowsLabel: "No Services Found",
        }}
        sx={{
          border: 0,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8FAFC",
            fontWeight: "bold",
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
      />

      {services.length === 0 && (
        <Box py={4} textAlign="center">
          <Typography color="text.secondary">
            No Services Found
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default ServiceTable;
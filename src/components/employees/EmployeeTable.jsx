import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Chip,
  Box,
  Avatar,
  Typography,
} from "@mui/material";

function EmployeeTable({employees = [],})
 {

  const departments = JSON.parse(
    localStorage.getItem("departments") || "[]"
  );


  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Employee",
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "primary.main",
              fontSize: 14,
            }}
          >
            {params.row.name
              ? params.row.name.charAt(0).toUpperCase()
              : "E"}
          </Avatar>

          <Typography variant="body2">
            {params.row.name}
          </Typography>
        </Box>
      ),
    },
{
  field: "departmentId",
  headerName: "Department",
  flex: 1,
  renderCell: (params) => {
    
   const dept = departments.find(
      (d) =>
        String(d.departmentId).trim() ===
        String(params.row.departmentId).trim()
    );

    return dept?.departmentName || "-";
  },
},

  
    {
      field: "email",
      headerName: "Email",
      flex: 1.8,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            fontWeight: 600,
            bgcolor:
              params.value === "Active"
                ? "#E8F5E9"
                : "#FDECEA",
            color:
              params.value === "Active"
                ? "#2E7D32"
                : "#D32F2F",
          }}
        />
      ),
    },
    
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }}
    >
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          border: 0,
          minHeight: 550,

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8FAFC",
            borderBottom: "2px solid #ECEFF1",
          },

          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 700,
            color: "#374151",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F5F8FF",
          },

          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #F1F5F9",
          },

          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#FAFAFA",
          },
        }}
      />
    </Paper>
  );
}

export default EmployeeTable;
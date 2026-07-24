import { DataGrid } from "@mui/x-data-grid";
import { Paper, IconButton, Tooltip } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useNavigate } from "react-router-dom";
import RequestStatusChip from "./RequestStatusChip";

function RequestTable({ requests }) {
  const navigate = useNavigate();

const rows = (requests || []).flatMap((request) =>
  request.services.map((service) => ({
    id: request.requestId + "-" + service.serviceId,

    requestId: request.requestId,

    employeeName: request.employeeName,

    departmentId: service.departmentId,

    serviceId: service.serviceId,

    serviceName: service.serviceName,

    employeeAnswer: service.employeeAnswer,

    requestDate: request.createdAt,

    status: service.status,
  }))
);
const departments =
  JSON.parse(localStorage.getItem("departments")) || [];

const getDepartmentName = (departmentId) => {
  const dept = departments.find(
    (d) => d.departmentId === departmentId
  );

  return dept ? dept.departmentName : "-";
};

  const columns = [
    {
      field: "requestId",
      headerName: "Request ID",
      flex: 1,
    },
    {
      field: "employeeName",
      headerName: "Employee",
      flex: 1.4,
    },
  {
  field: "departmentId",
  headerName: "Department",
  flex: 1.2,
  renderCell: (params) =>
    getDepartmentName(params.value),
},
    {
      field: "serviceName",
      headerName: "Service",
      flex: 1.4,
    },
    {
      field: "requestDate",
      headerName: "Date",
      flex: 1,
    },
    {
  field: "employeeAnswer",
  headerName: "Employee Response",
  flex: 1,
},
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <RequestStatusChip status={params.value} />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      flex: 0.8,
      renderCell: (params) => (
        <Tooltip title="View Request">
          <IconButton
            color="primary"
            onClick={() =>
              navigate(`/department/requests/${params.row.requestId}/${params.row.serviceId}`)
            }
          >
            <VisibilityRoundedIcon />
          </IconButton>
        </Tooltip>
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
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}   // 🔥 IMPORTANT SAFETY
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        sx={{
          border: 0,
          minHeight: 500,
        }}
      />
    </Paper>
  );
}

export default RequestTable;
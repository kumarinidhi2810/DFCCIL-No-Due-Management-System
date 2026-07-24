import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Typography,
  Box,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function ServiceTable({
  services = [],
  onEdit,
  onDelete,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        {/* Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><b>Service ID</b></TableCell>
            <TableCell><b>Service Name</b></TableCell>
            <TableCell><b>Category</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Box py={3}>
                  <Typography color="text.secondary">
                    No Services Found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => (
              <TableRow hover key={service.id}>
                <TableCell>{service.serviceId}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.category}</TableCell>

                <TableCell>
                  <Chip
                    label={service.status}
                    color={
                      service.status === "Active"
                        ? "success"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="warning"
                    onClick={() => onEdit(service)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(service.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ServiceTable;
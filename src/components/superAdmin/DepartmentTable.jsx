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

function DepartmentTable({
  departments = [],
  onEdit = () => {},
  onDelete = () => {},
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

        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ background: "#F5F5F5" }}>
            <TableCell>
              <b>Dept ID</b>
            </TableCell>

            <TableCell>
              <b>Dept Name</b>
            </TableCell>

            <TableCell>
              <b>Status</b>
            </TableCell>

            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {departments.length > 0 ? (
            departments.map((dept) => (
              <TableRow
                hover
                key={dept.departmentId}
              >
                <TableCell>
                  {dept.departmentId || "-"}
                </TableCell>

                <TableCell>
                  {dept.departmentName || "-"}
                </TableCell>

                <TableCell>
                  <Chip
                    label={dept.status || "Active"}
                    color={
                      dept.status === "Inactive"
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="warning"
                    onClick={() => onEdit(dept)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(dept.departmentId)
                    }
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 3,
                  }}
                >
                  <Typography color="text.secondary">
                    No Departments Found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </Paper>
  );
}

export default DepartmentTable;
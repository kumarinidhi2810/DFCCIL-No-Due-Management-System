import { useEffect, useState } from "react";

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

function ProviderTable({
  providers = [],
  onEdit = () => {},
  onDelete = () => {},
}) {
 const [departments, setDepartments] = useState([]);

useEffect(() => {
  setDepartments(
    JSON.parse(localStorage.getItem("departments")) || []
  );
}, []);



  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>

        <TableHead>
          <TableRow sx={{ background: "#F5F5F5" }}>
            <TableCell><b>Provider ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Department</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {providers.length > 0 ? (
            providers.map((prov) => (
              <TableRow hover key={prov.id}>

                <TableCell>{prov.providerId}</TableCell>

                <TableCell>{prov.name}</TableCell>

            <TableCell>
  {
    departments.find(
      (d) => d.departmentId === prov.departmentId
    )?.departmentName || "-"
  }
</TableCell>

                <TableCell>{prov.email}</TableCell>

                <TableCell>
                  <Chip
                    label={prov.status}
                    color={
                      prov.status === "Inactive"
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">

                  <IconButton
                    color="warning"
                    onClick={() => onEdit(prov)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(prov.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>

                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography color="text.secondary">
                    No Providers Found
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

export default ProviderTable;
import { useState } from "react";

import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import RequestTable from "../../components/superAdmin/RequestTable";

function Requests() {
  const [requests, setRequests] = useState(() => {
  return JSON.parse(localStorage.getItem("requests")) || [];
});
  const [search, setSearch] = useState("");

  //  FILTER
  const filteredRequests = requests.filter((req) =>
    req.employee?.toLowerCase().includes(search.toLowerCase()) ||
    req.department?.toLowerCase().includes(search.toLowerCase()) ||
    req.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4, background: "#F5F7FA", minHeight: "100vh" }}>

      {/* HEADER */}
      <Typography variant="h4" fontWeight={700}>
        Requests Management
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Track all no-due requests
      </Typography>

      {/* SEARCH */}
      <Grid container spacing={2} mb={3}>

        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search Requests..."
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

      </Grid>

      {/* TABLE */}
      <RequestTable
        requests={filteredRequests}
        setRequests={setRequests}
      />

    </Box>
  );
}

export default Requests;
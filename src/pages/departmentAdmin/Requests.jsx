import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RequestTable from "../../components/requests/RequestTable";

function Requests() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [requestsData, setRequestsData] = useState([]);

  //  Logged in department admin
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  //  Load + filter by department
const loadRequests = () => {
  const data = JSON.parse(
    localStorage.getItem("requests") || "[]"
  );

  if (!loggedInUser?.departmentId) {
    setRequestsData([]);
    return;
  }
const deptRequests = data
  .map((request) => {
    const departmentServices = request.services?.filter(
      (service) =>
        service.departmentId === loggedInUser.departmentId &&
        service.status !== "PROVIDER_APPROVED" &&
        service.status !== "FINAL_APPROVED"
    );

    if (!departmentServices?.length) {
      return null;
    }

    return {
      ...request,
      services: departmentServices,
    };
  })
  .filter(Boolean);

  setRequestsData(deptRequests);
};

  useEffect(() => {
    loadRequests();

    //  refresh data if localStorage changes
    const handleStorage = () => {
      loadRequests();
    };

    window.addEventListener("storage", handleStorage);

    // auto refresh (same tab issue fix)
    const interval = setInterval(loadRequests, 2000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  //  Search + Filter
  const filteredRequests = requestsData.filter((request) => {
    const matchesSearch =
      (request.employeeName || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (request.id || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
  status === "All" ||
  request.status === status.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 4 }}>

      {/* Header */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Requests
        </Typography>

        <Typography color="text.secondary">
          Manage employee no due requests
        </Typography>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">

        <TextField
          placeholder="Search Employee / Request ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 180 }}
        >
         <MenuItem value="PENDING">Pending</MenuItem>
<MenuItem value="DEPT_APPROVED">Department Approved</MenuItem>
<MenuItem value="PROVIDER_APPROVED">Provider Approved</MenuItem>
<MenuItem value="FINAL_APPROVED">Final Approved</MenuItem>
<MenuItem value="REJECTED">Rejected</MenuItem>
        </TextField>

      </Box>

      {/* Table */}
      <RequestTable requests={filteredRequests} />

    </Box>
  );
}

export default Requests;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Divider,
  Button,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";

function ViewRequest() {
  const { requestId, serviceId } = useParams();

const navigate = useNavigate();

const user =
  JSON.parse(localStorage.getItem("user")) || {};

const [request, setRequest] = useState(null);
  const [remarks, setRemarks] = useState("");

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");


useEffect(() => {

  const requests =
    JSON.parse(localStorage.getItem("requests")) || [];

  const requestData = requests.find(
    (r) => r.requestId === requestId
  );

  if (!requestData) return;

  const serviceData = requestData.services.find(
    (s) => s.serviceId === serviceId
  );

  setRequest({
    ...requestData,
    service: serviceData,
  });

}, [requestId, serviceId]);
if (!request) {
  return (
    <Typography p={4}>
      Request Not Found
    </Typography>
  );
}
const departments = JSON.parse(
  localStorage.getItem("departments") || "[]"
);

const departmentName =
  departments.find(
    (dept) =>
      String(dept.departmentId) ===
      String(request?.departmentId)
  )?.departmentName || "";

const handleApprove = () => {

  const requests =
    JSON.parse(localStorage.getItem("requests")) || [];

  const updatedRequests = requests.map((req) => {

    if (req.requestId !== requestId)
      return req;

    const updatedServices =
      req.services.map((service) =>

        service.serviceId === serviceId
          ? {
              ...service,
              status: "PROVIDER_APPROVED",
              approvedBy: user.name,
              approvedDate:
                new Date().toLocaleString(),
              remarks,
            }
          : service
      );

    // Check if all services are provider approved
    const allApproved =
      updatedServices.every(
        (s) => s.status === "PROVIDER_APPROVED"
      );
       const finalServices = allApproved
      ? updatedServices.map((service) => ({
          ...service,
          status: "FINAL_APPROVED",
        }))
      : updatedServices;

    return {
      ...req,
      services: updatedServices,
      status: allApproved
        ? "FINAL_APPROVED"
        : req.status,
    };

  });

  localStorage.setItem(
    "requests",
    JSON.stringify(updatedRequests)
  );

  setMessage("Request Approved Successfully");
  setOpen(true);

  navigate("/provider/pending");

};


 const handleReject = () => {

  const requests =
    JSON.parse(localStorage.getItem("requests")) || [];

  const updatedRequests = requests.map((req) => {

    if (req.requestId !== requestId)
      return req;

    return {

      ...req,

      status: "REJECTED",

      services: req.services.map((service) =>

        service.serviceId === serviceId
          ? {
              ...service,
              status: "REJECTED",
              approvedBy: user.name,
              approvedDate:
                new Date().toLocaleString(),
              remarks,
            }
          : service

      ),

    };

  });

  localStorage.setItem(
    "requests",
    JSON.stringify(updatedRequests)
  );

 setMessage("Request Approved Successfully");
setOpen(true);


  navigate("/provider/pending");


};

  return (
    <Box
      sx={{
        background: "#F5F7FA",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
      >
        View Request
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Review employee request details.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
        >
          Employee Information
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee Name"
              value={request?.employeeName}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee ID"
              value={request?.employeeId}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              value={departmentName}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              value={request?.designation}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={request?.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>

        </Grid>

        <Typography
          variant="h6"
          fontWeight={600}
          mt={5}
        >
          Request Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Request Type"
              value={request?.requestType}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
          <TextField
  fullWidth
  label="Applied Date"
  value={request?.createdAt || ""}
  InputLabelProps={{
    shrink: true,
  }}
  InputProps={{
    readOnly: true,
  }}
/>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Assigned Service"
              value={request.service?.serviceName}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason"
              value={request?.reason}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Chip
              label={request.service?.status}
              color="warning"
            />
          </Grid>

        </Grid>

        <Typography
          variant="h6"
          fontWeight={600}
          mt={5}
        >
          Provider Remarks
        </Typography>

        <Divider sx={{ my: 2 }} />

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter your remarks..."
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={handleReject}
          >
            Reject
          </Button>

          <Button
            variant="contained"
            sx={{
              background: "#D90429",
              "&:hover": {
                background: "#B00020",
              },
            }}
            onClick={handleApprove}
          >
            Approve
          </Button>
        </Box>

      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    
  


    </Box>
  );
}

export default ViewRequest;
import { useParams } from "react-router-dom";
import { addNotification } from "../../utils/notificationService";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

function RequestDetails() {
  const { requestId } = useParams();

  const [remarks, setRemarks] = useState("");
  const [request, setRequest] = useState(null);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

  useEffect(() => {
    const requests =
      JSON.parse(localStorage.getItem("requests")) || [];

    const requestData = requests.find(
      (r) => r.requestId === requestId
    );

    if (!requestData) return;

    setRequest(requestData);
  }, [requestId]);

  const getDepartmentName = (departmentId) => {
    const department = departments.find(
      (dept) => dept.departmentId === departmentId
    );

    return department?.departmentName || departmentId;
  };

  const departmentServices =
    request?.services?.filter(
      (service) =>
        service.departmentId === user.departmentId
    ) || [];

  const updateStatus = (serviceId, status) => {
    const requests =
      JSON.parse(localStorage.getItem("requests")) || [];

    const updatedRequests = requests.map((req) => {
      if (req.requestId !== requestId) {
        return req;
      }

      return {
        ...req,

        services: req.services.map((service) =>
          service.serviceId === serviceId
            ? {
                ...service,
                status,
                approvedBy: user.name,
                approvedDate: new Date().toLocaleString(),
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

    const updatedRequest = updatedRequests.find(
      (req) => req.requestId === requestId
    );

    setRequest(updatedRequest);

    const updatedService =
      updatedRequest.services.find(
        (service) => service.serviceId === serviceId
      );

    if (status === "DEPT_APPROVED") {
      addNotification({
        role: "Provider",
        departmentId: updatedService.departmentId,
        title: "Department Approval",
        message: `${updatedRequest.employeeName}'s request is ready for Provider approval.`,
        requestId: updatedRequest.requestId,
      });
    } else {
      addNotification({
        role: "Employee",
        userId: updatedRequest.employeeId,
        title: "Request Rejected",
        message:
          "Your No Due request has been rejected by the Department.",
        requestId: updatedRequest.requestId,
      });
    }

    setRemarks("");
  };

  if (!request) {
    return (
      <Typography p={4}>
        Request Not Found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            {request.requestId}
          </Typography>

          <Typography color="text.secondary">
            No Due Clearance Request
          </Typography>
        </Box>

        <Chip
          label="IN PROGRESS"
          color="warning"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {/* REQUEST DETAILS */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography
              color="text.secondary"
              fontSize={13}
            >
              REQUESTOR
            </Typography>

            <Typography fontWeight={600}>
              {request.employeeName}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              color="text.secondary"
              fontSize={13}
            >
              EMPLOYEE ID
            </Typography>

            <Typography fontWeight={600}>
              {request.employeeId}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              color="text.secondary"
              fontSize={13}
            >
              CREATED ON
            </Typography>

            <Typography fontWeight={600}>
              {request.createdAt}
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              color="text.secondary"
              fontSize={13}
            >
              DEPARTMENT
            </Typography>

            <Typography fontWeight={600}>
              {getDepartmentName(
                request.departmentId
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* REQUEST FLOW */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={4}
        >
          Request Flow
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            overflowX: "auto",
            pb: 2,
          }}
        >
          {/* REQUESTOR */}
          <Paper
            sx={{
              p: 3,
              minWidth: 230,
              borderRadius: 3,
              border: "2px solid #1976D2",
              background: "#EAF3FF",
            }}
          >
            <Typography
              color="primary"
              fontWeight={700}
            >
              REQUESTOR
            </Typography>

            <Typography
              variant="h6"
              mt={2}
              fontWeight={700}
            >
              {request.employeeName}
            </Typography>

            <Typography>
              {request.employeeId}
            </Typography>

            <Chip
              label="CREATOR"
              color="primary"
              size="small"
              sx={{ mt: 2 }}
            />
          </Paper>

          <Typography fontSize={32}>
            →
          </Typography>

          {/* DEPARTMENT SERVICES */}
          {departmentServices.map((service) => (
            <Box
              key={service.serviceId}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Paper
                sx={{
                  p: 3,
                  minWidth: 280,
                  borderRadius: 3,
                  border:
                    service.status === "DEPT_APPROVED"
                      ? "2px solid #2E7D32"
                      : service.status === "REJECTED"
                      ? "2px solid #D32F2F"
                      : "2px solid #ED6C02",

                  background:
                    service.status === "DEPT_APPROVED"
                      ? "#E8F5E9"
                      : service.status === "REJECTED"
                      ? "#FFEBEE"
                      : "#FFF8E1",
                }}
              >
                <Typography
                  fontWeight={700}
                  color="text.secondary"
                >
                  {getDepartmentName(
                    service.departmentId
                  )}
                </Typography>

                <Typography
                  variant="h6"
                  mt={1}
                  fontWeight={700}
                >
                  {service.serviceName}
                </Typography>

                <Typography
                  color="text.secondary"
                  mt={1}
                >
                  Provider: {service.providerName}
                </Typography>

                <Chip
                  label={service.status}
                  size="small"
                  sx={{ mt: 2 }}
                  color={
                    service.status === "DEPT_APPROVED"
                      ? "success"
                      : service.status === "REJECTED"
                      ? "error"
                      : "warning"
                  }
                />

                {/* ADMIN ACTION */}
               {![
  "DEPT_APPROVED",
  "PROVIDER_APPROVED",
  "FINAL_APPROVED",
  "REJECTED",
].includes(service.status) && (
                    <Box mt={3}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Remarks"
                        value={remarks}
                        onChange={(e) =>
                          setRemarks(e.target.value)
                        }
                      />

                      <Box
                        display="flex"
                        gap={1}
                        mt={2}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() =>
                            updateStatus(
                              service.serviceId,
                              "DEPT_APPROVED"
                            )
                          }
                        >
                          Approve
                        </Button>

                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            updateStatus(
                              service.serviceId,
                              "REJECTED"
                            )
                          }
                        >
                          Reject
                        </Button>
                      </Box>
                    </Box>
                  )}
              </Paper>

              <Typography fontSize={32}>
                →
              </Typography>
            </Box>
          ))}

          {/* FINAL STAGE */}
          <Paper
            sx={{
              p: 3,
              minWidth: 230,
              borderRadius: 3,
              border: "2px solid #9E9E9E",
              background: "#F5F5F5",
            }}
          >
            <Typography fontWeight={700}>
              FINAL STAGE
            </Typography>

            <Typography
              variant="h6"
              mt={2}
              fontWeight={700}
            >
              No Due Certificate
            </Typography>

           <Chip
  label={
    request.status === "FINAL_APPROVED"
      ? "CERTIFICATE READY"
      : "PENDING"
  }
  color={
    request.status === "FINAL_APPROVED"
      ? "success"
      : "default"
  }
/>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
}

export default RequestDetails;
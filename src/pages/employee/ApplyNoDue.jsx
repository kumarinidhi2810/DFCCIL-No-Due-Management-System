import { useState,useEffect } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { addNotification } from "../../utils/notificationService";

function ApplyNoDue() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
const [departmentName, setDepartmentName] = useState("");

useEffect(() => {
  const userData = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const departmentsData = JSON.parse(
    localStorage.getItem("departments") || "[]"
  );

  const matchedDepartment = departmentsData.find(
    (dept) => dept.departmentId === userData.departmentId
  );

  console.log("USER DEPARTMENT ID:", userData.departmentId);
  console.log("DEPARTMENTS:", departmentsData);
  console.log("MATCHED DEPARTMENT:", matchedDepartment);

  setDepartmentName(
    matchedDepartment?.departmentName || ""
  );
}, []);
  const [formData, setFormData] = useState({
    employeeName: user.name || "",
    employeeId: user.employeeId || "",
    email: user.email || "",
    mobile: user.mobile || "",
    department:departmentName,
    designation: user.designation || "",
    requestType: "",
    lastWorkingDate: "",
    reason: "",
  });
 


 

const [services, setServices] = useState(() => {
  const allServices =
    JSON.parse(localStorage.getItem("services")) || [];

  return allServices.filter(
    (service) => service.status === "Active"
  );
});

 
const [documents, setDocuments] = useState({
    resignationLetter: null,
    idCard: null,
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "mobile") {
    const mobile = value.replace(/\D/g, ""); 

    if (mobile.length <= 10) {
      setFormData({
        ...formData,
        mobile,
      });
    }
    return;
  }

  setFormData({
    ...formData,
    [name]: value,
  });
};
   const handleStatusChange = (serviceId, value) => {
  setServiceStatus((prev) => ({
    ...prev,
    [serviceId]: value,
  }));
};
const [serviceStatus, setServiceStatus] = useState({});
const handleFileChange = (e) => {
  const { name, files } = e.target;

  setDocuments({
    ...documents,
    [name]: files[0],
  });
};
const handleSubmit = () => {
 const newErrors = {};

if (!formData.mobile) {
  newErrors.mobile = "*Mobile Number is required";
} else if (formData.mobile.length !== 10) {
  newErrors.mobile = "*Mobile Number must be 10 digits";
}

if (!formData.requestType) {
  newErrors.requestType = "*Request Type is required";
}

if (!formData.lastWorkingDate) {
  newErrors.lastWorkingDate = "*Last Working Date is required";
}

if (!formData.reason.trim()) {
  newErrors.reason = "*Reason is required";
}

// Department Clearance Validation
services.forEach((service) => {
  if (!serviceStatus[service.serviceId]) {
    newErrors[`service_${service.serviceId}`] =
      "*Please select Yes or No";
  }
});

// Document Validation (optional)
if (!documents.resignationLetter) {
  newErrors.resignationLetter =
    "*Please upload resignation letter";
}

if (!documents.idCard) {
  newErrors.idCard = "*Please upload Employee ID";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
// Resignation Letter
if (!documents.resignationLetter) {
  newErrors.resignationLetter =
    "*Resignation Letter is required";
}

// Employee ID
if (!documents.idCard) {
  newErrors.idCard =
    "*Employee ID is required";
}
  const user = JSON.parse(localStorage.getItem("user"));
  const requests =
    JSON.parse(localStorage.getItem("requests")) || [];
    const existingPendingRequest = requests.find(
  (request) =>
    request.employeeId === user.employeeId &&
    (request.status === "PENDING" ||
     request.status === "IN_PROGRESS")
);

if (existingPendingRequest) {
 console.log("Pending Request Found");
alert("You already have a pending No Due request.");
return;
}

  const newRequest = {
    id: Date.now(),
    requestId: "REQ" + Date.now(),

    employeeName: formData.employeeName,
    employeeId: formData.employeeId,
    email: formData.email,
    mobile: formData.mobile,

    department: formData.department,
    departmentId:user.departmentId,
    designation: formData.designation,

    requestType: formData.requestType,
    lastWorkingDate:formData.lastWorkingDate, 
    reason:formData.reason,
       
    status: "PENDING",
    createdAt:new Date().toLocaleDateString(),

    services: services.map((service) => ({
  serviceId: service.serviceId,

  serviceName: service.serviceName,

  departmentId: service.departmentId,

  providerId: service.providerId,

  providerName: service.providerName,

  employeeAnswer:
    serviceStatus[service.serviceId] || "",

  status: "PENDING",

  approvedBy: "",

  approvedDate: "",

  remarks: "",
}))
};
console.log(newRequest);
console.log("Saved Services:", newRequest.services);
  requests.push(newRequest);

  localStorage.setItem(
    "requests",
    JSON.stringify(requests)
  );
console.log("Before addNotification");

console.log("Services Count:", newRequest.services.length);

newRequest.services.forEach((service) => {
  console.log("Creating notification for:", service.departmentId);
  // Department Admin Notification
  addNotification({
    role: "departmentAdmin",
    departmentId: service.departmentId,
    title: "New No Due Request",
    message: `${newRequest.employeeName} has submitted a No Due request.`,
    requestId: newRequest.requestId,
    employeeName: newRequest.employeeName,
  });

  // Provider Notification
  addNotification({
    role: "provider",
    userId: service.providerId,
    title: "New No Due Request",
    message: `${newRequest.employeeName} has submitted a No Due request.`,
    requestId: newRequest.requestId,
    employeeName: newRequest.employeeName,
  });
});

console.log("After addNotification");

  // Optional 
  const oldRequests =
    JSON.parse(localStorage.getItem("noDueRequests")) || [];

  localStorage.setItem(
    "noDueRequests",
    JSON.stringify([...oldRequests, newRequest])
  );

  setOpenSnackbar(true);

  setFormData({
    employeeName: "",
    employeeId: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    requestType: "",
    lastWorkingDate: "",
    reason: "",
  });

  setServiceStatus({});

  setDocuments({
    resignationLetter: null,
    idCard: null,
  });
};
const departments =
  JSON.parse(localStorage.getItem("departments")) || [];

const groupedServices = departments
  .map((department) => ({
    ...department,
    services: services.filter(
      (service) =>
        service.departmentId === department.departmentId
    ),
  }))
  .filter((department) => department.services.length > 0);

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
        Apply No Due
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Submit your No Due Clearance Request
      </Typography>

      {/* Employee Information */}

      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          Employee Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee Name"
              name="employeeName"
              value={formData.employeeName}
              InputProps={{
    readOnly: true,
  }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              InputProps={{
    readOnly: true,
  }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              InputProps={{
    readOnly: true,
  }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
           <TextField
  fullWidth
  label="Mobile Number"
  name="mobile"
  value={formData.mobile}
  onChange={handleChange}
  inputProps={{
    maxLength: 10,
    inputMode: "numeric",
  }}
/>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
             value={departmentName}

              InputProps={{
    readOnly: true,
              
  }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              InputProps={{
    readOnly: true,
  }}
            />
          </Grid>

        </Grid>
      </Paper>

      {/* Request Details */}

      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          mb={2}
        >
          Request Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
          <TextField
  select
  fullWidth
  label="Request Type"
  name="requestType"
  value={formData.requestType}
  onChange={handleChange}
  error={!!errors.requestType}
  helperText={errors.requestType}
>
              <MenuItem value="Resignation">
                Resignation
              </MenuItem>

              <MenuItem value="Transfer">
                Transfer
              </MenuItem>

              <MenuItem value="Retirement">
                Retirement
              </MenuItem>

              <MenuItem value="Contract End">
                Contract End
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
  fullWidth
  type="date"
  label="Last Working Date"
  name="lastWorkingDate"
  value={formData.lastWorkingDate}
  onChange={handleChange}
  error={!!errors.lastWorkingDate}
  helperText={errors.lastWorkingDate}
  InputLabelProps={{
    shrink: true,
  }}
/>
          </Grid>

          <Grid item xs={12}>
          <TextField
  fullWidth
  multiline
  rows={5}
  label="Reason for Leaving"
  name="reason"
  value={formData.reason}
  onChange={handleChange}
  error={!!errors.reason}
  helperText={errors.reason}
/>
          </Grid>

        </Grid>
      </Paper>
      <Paper
  elevation={2}
  sx={{
    p: 4,
    borderRadius: 3,
    mb: 4,
  }}
>
  <Typography
    variant="h6"
    fontWeight={600}
    mb={2}
  >
    Department Clearance
  </Typography>

  <Divider sx={{ mb: 3 }} />
<Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  {groupedServices.map((department) => (
    <Paper
      key={department.departmentId}
      variant="outlined"
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        fontWeight={700}
        color="primary"
        sx={{ mb: 2 }}
      >
        {department.departmentName}
      </Typography>

      {department.services.map((service) => (
        <Box
          key={service.serviceId}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.5,
            borderBottom: "1px solid #ECECEC",
          }}
        >
          <Typography>
            {service.serviceName}
          </Typography>

          <RadioGroup
            row
            value={serviceStatus[service.serviceId] || ""}
            onChange={(e) =>
              handleStatusChange(
                service.serviceId,
                e.target.value
              )
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio size="small" />}
              label="Yes"
            />

            <FormControlLabel
              value="no"
              control={<Radio size="small" />}
              label="No"
            />
          </RadioGroup>
          {errors[`service_${service.serviceId}`] && (
  <Typography
    color="error"
    variant="caption"
     sx={{
        mt: 1,
        ml: "auto",
        display: "table",
      }}
  >
    {errors[`service_${service.serviceId}`]}
  </Typography>
)}
        </Box>
      ))}
    </Paper>
  ))}


</Box>
</Paper>

  

    


<Paper
  elevation={2}
  sx={{
    p: 4,
    borderRadius: 3,
    mb: 4,
  }}
>
  <Typography
    variant="h6"
    fontWeight={600}
    mb={2}
  >
    Upload Documents
  </Typography>

  <Divider sx={{ mb: 3 }} />

  <Grid container spacing={3}>

    <Grid item xs={12} md={6}>

      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<CloudUploadOutlinedIcon />}
        sx={{
          py: 1.5,
          borderStyle: "dashed",
        }}
      >
        Upload Resignation Letter

        <input
          hidden
          type="file"
          name="resignationLetter"
          onChange={handleFileChange}
        />
      </Button>
      {errors.resignationLetter && (
  <Typography
    variant="caption"
    color="error"
    sx={{
      display: "block",
      mt: 1,
      ml: 1,
    }}
  >
    {errors.resignationLetter}
  </Typography>
      )}

      {documents.resignationLetter && (
        <Typography
          mt={1}
          variant="body2"
          color="success.main"
        >
          {documents.resignationLetter.name}
 
        </Typography>

      )}

    </Grid>

    <Grid item xs={12} md={6}>

      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<CloudUploadOutlinedIcon />}
        sx={{
          py: 1.5,
          borderStyle: "dashed",
        }}
      >
        Upload Employee ID

        <input
          hidden
          type="file"
          name="idCard"
          onChange={handleFileChange}
        />
      </Button>
              {errors.idCard && (
  <Typography
    color="error"
    variant="caption"
    sx={{ display: "block", mt: 1 }}
  >
    {errors.idCard}
  </Typography>
)}

      {documents.idCard && (
        <Typography
          mt={1}
          variant="body2"
          color="success.main"
        >
          {documents.idCard.name}
  
        </Typography>
      )}

    </Grid>

  </Grid>
</Paper>
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    mb: 4,
  }}
>
  <Button
    variant="outlined"
    size="large"
  >
    Cancel
  </Button>

<Button
  variant="contained"
  onClick={handleSubmit}
>
  Submit Request
</Button>

<Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
>
  <Alert
    severity="success"
    variant="filled"
    onClose={() => setOpenSnackbar(false)}
  >
    No Due Request Submitted Successfully!
  </Alert>
</Snackbar>

</Box>
    </Box>
  );

}
export default ApplyNoDue;
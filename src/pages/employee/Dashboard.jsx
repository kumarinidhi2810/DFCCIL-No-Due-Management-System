import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatCard from "../../components/dashboard/StatCard";

function EmployeeDashboard() {
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem("user")) || {};
const requests = JSON.parse(localStorage.getItem("requests")) || [];

const myRequests = requests.filter(
  (r) => String(r.employeeId) === String(user.employeeId)
);

const total = myRequests.length;

const pending = myRequests.filter(
  (r) =>
    r.status === "PENDING" ||
    r.status === "DEPT_APPROVED" ||
    r.status === "PROVIDER_APPROVED"
).length;

const approved = myRequests.filter(
  (r) => r.status === "FINAL_APPROVED"
).length;

const rejected = myRequests.filter(
  (r) => r.status === "REJECTED"
).length;

  return (
    <>
      <WelcomeBanner user={user} />

      <Grid container spacing={3}>

        {/* Total Requests */}
        <Grid item xs={12} sm={6} md={3}>
         <StatCard
  title="My Requests"
  value={total}
  color="#2563EB"
  icon={<AssignmentTurnedInRoundedIcon />}
  onClick={() => navigate("/employee/requests")}
/>
        </Grid>

        {/* Pending */}
        <Grid item xs={12} sm={6} md={3}>
        <StatCard
  title="Pending"
  value={pending}
  color="#F59E0B"
  icon={<HourglassTopRoundedIcon />}
  onClick={() => navigate("/employee/requests?status=PENDING")}
/>
        </Grid>

        {/* Approved */}
        <Grid item xs={12} sm={6} md={3}>
         <StatCard
  title="Approved"
  value={approved}
  color="#16A34A"
  icon={<CheckCircleRoundedIcon />}
  onClick={() =>
  navigate("/employee/requests?status=FINAL_APPROVED")
}
  
/>
        </Grid>

        {/* Rejected */}
        <Grid item xs={12} sm={6} md={3}>
        <StatCard
  title="Rejected"
  value={rejected}
  color="#DC2626"
  icon={<CancelRoundedIcon />}
  onClick={() =>
  navigate("/employee/requests?status=REJECTED")
}
/>
        </Grid>

      </Grid>
    </>
  );
}

export default EmployeeDashboard;
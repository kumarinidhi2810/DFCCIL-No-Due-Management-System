import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatCard from "../../components/dashboard/StatCard";
import RecentRequests from "../../components/dashboard/RecentRequests";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const employees = JSON.parse(
    localStorage.getItem("employees") || "[]"
  );

  const services = JSON.parse(
    localStorage.getItem("services") || "[]"
  );

  const providers = JSON.parse(
    localStorage.getItem("providers") || "[]"
  );

  const requests = JSON.parse(
    localStorage.getItem("requests") || "[]"
  );

  const departmentId = user.departmentId;

  // Department-wise data
  const departmentEmployees = employees.filter(
    (emp) => emp.departmentId === departmentId
  );

  const departmentServices = services.filter(
    (service) => service.departmentId === departmentId
  );

  const departmentProviders = providers.filter(
    (provider) => provider.departmentId === departmentId
  );

 const departmentRequests = requests
  .map((request) => {
    const departmentServices = request.services?.filter(
      (service) =>
        service.departmentId === departmentId &&
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


  // Stats
  const totalEmployees = departmentEmployees.length;

  const totalServices = departmentServices.length;

  const totalProviders = departmentProviders.length;

  const pendingRequests = departmentRequests.filter(
    (r) =>
      r.status === "PENDING" ||
      r.status === "DEPT_APPROVED" ||
      r.status === "PROVIDER_APPROVED"
  ).length;
  
  

  const approvedRequests = departmentRequests.filter(
    (r) => r.status === "FINAL_APPROVED"
  ).length;

  const rejectedRequests = departmentRequests.filter(
    (r) => r.status === "REJECTED"
  ).length;

  return (
    <>
      {/* Welcome */}
      <WelcomeBanner user={user} />

      {/* Department Stats */}
      <Grid container spacing={2.5} mb={4}>

        {/* Employees */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Employees"
            value={totalEmployees}
            color="#2563EB"
            icon={<GroupsRoundedIcon />}
              onClick={() => navigate("/department/employees")}
          />
        </Grid>

        {/* Services */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Services"
            value={totalServices}
            color="#0EA5E9"
            icon={<MiscellaneousServicesRoundedIcon />}
              onClick={() => navigate("/department/services")}

          />
        </Grid>

        {/* Providers */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Providers"
            value={totalProviders}
            color="#7C3AED"
            icon={<EngineeringRoundedIcon />}
              onClick={() => navigate("/department/providers")}
          />
        </Grid>

        {/* Pending */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Pending"
            value={pendingRequests}
            color="#D97706"
            icon={<PendingActionsRoundedIcon />}
              onClick={() => navigate("/department/requests?status=pending")}

          />
        </Grid>

        {/* Approved */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Approved"
            value={approvedRequests}
            color="#059669"
            icon={<CheckCircleRoundedIcon />}
              onClick={() => navigate("/department/requests?status=approved")}

          />
        </Grid>

        {/* Rejected */}
        <Grid item xs={12} sm={6} md={2}>
          <StatCard
            title="Rejected"
            value={rejectedRequests}
            color="#DC2626"
            icon={<CancelRoundedIcon />}
              onClick={() => navigate("/department/requests?status=rejected")}

          />
        </Grid>

      </Grid>

      {/* Recent Requests */}
      <RecentRequests
        requests={departmentRequests}
      />

    </>
  );
}

export default Dashboard;
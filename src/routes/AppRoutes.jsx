import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import SuperAdminDashboard from "../pages/superAdmin/Dashboard";
import DepartmentDashboard from "../pages/departmentAdmin/Dashboard";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import EmployeeDashboard from "../pages/employee/Dashboard";
import Providers from "../pages/departmentAdmin/Providers";
import ProtectedRoute from "./ProtectedRoute";
import Services from "../pages/departmentAdmin/Services";
import { menuConfig } from "../config/menuConfig";
import Employees from "../pages/departmentAdmin/Employees";
import Requests from "../pages/departmentAdmin/Requests";
import RequestDetails from "../pages/departmentAdmin/RequestDetails";
import Profile from "../pages/departmentAdmin/Profile";
import ApplyNoDue from "../pages/employee/ApplyNoDue";
import Certificate from "../pages/employee/certificate";
import RequestHistory from "../pages/employee/RequestHistory";
import ApprovedRequests from "../pages/provider/ApprovedRequests";
import PendingRequests from "../pages/provider/PendingRequests"
import RejectedRequests from "../pages/provider/RejectedRequests";
import ViewRequest from "../pages/provider/ViewRequest";
import SuperAdminDepartments from "../pages/superAdmin/Departments";
import SuperAdminEmployees from "../pages/superAdmin/Employees";
import SuperAdminReports from "../pages/superAdmin/Reports";
import SuperAdminRequests from "../pages/superAdmin/Requests";
import SuperAdminServices from "../pages/superAdmin/Services";
import SuperAdminProviders from "../pages/superAdmin/Providers";
import ChangePassword from "../pages/common/ChangePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Department Admin */}
        <Route
          element={
            <ProtectedRoute
              user={{
                name: "Nidhi Kumari",
                role: "Department Admin",
              }}
              menuItems={menuConfig.departmentAdmin}
            />
          }
        >
   
          <Route
            path="/department/dashboard"
            element={<DepartmentDashboard />}
          />

          <Route
            path="/department/services"
            element={<Services />}
          />
          <Route
            path="/department/requests/:requestId/:serviceId"
            element={<RequestDetails />}
          />

          <Route
            path="/department/employees"
            element={<Employees />}
          />

          <Route
            path="/department/providers"
            element={<Providers />}
          />
          <Route
            path="/department/requests"
            element={<Requests />}
          />
          <Route path="department/profile" element={<Profile />} />
        </Route>
        {/* Super Admin */}
        <Route
          element={
            <ProtectedRoute
              user={{
                name: "Admin",
                role: "Super Admin",
              }}
              menuItems={menuConfig.superAdmin}
            />
          }
        >
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route
            path="/super-admin/departments"
            element={<SuperAdminDepartments />}
          />

          <Route
            path="/super-admin/department-admins"
            element={<SuperAdminEmployees />}
          />
          <Route
            path="/super-admin/providers"
            element={<SuperAdminProviders />}
          />
          <Route
            path="/super-admin/reports"
            element={<SuperAdminReports />}
          />
          <Route
            path="/super-admin/requests"
            element={<SuperAdminRequests />}
          />
          <Route
  path="/super-admin/requests/:requestId"
  element={<RequestDetails />}
/>
          <Route
            path="/super-admin/services"
            element={<SuperAdminServices />}
          />

   

        </Route>

        {/* Provider */}
        <Route
          element={
            <ProtectedRoute
              user={{
                name: "Naveen",
                role: "Provider",
              }}
              menuItems={menuConfig.provider}
            />
          }
        >
          <Route
            path="/provider/dashboard"
            element={<ProviderDashboard />}
          />
          <Route
            path="/provider/approved"
            element={<ApprovedRequests />}
          />
          <Route
            path="/provider/pending"
            element={<PendingRequests />}
          />
          <Route
            path="/provider/rejected"
            element={<RejectedRequests />}
          />
         <Route
  path="/provider/view/:requestId/:serviceId"
  element={<ViewRequest />}
/>
        </Route>

        {/* Employee */}
        <Route
          element={
            <ProtectedRoute
              user={{
                name: "Employee",
                role: "Employee",
              }}
              menuItems={menuConfig.employee}
            />
          }
        >
          <Route
            path="/employee/dashboard"
            element={<EmployeeDashboard />}
          />
          <Route path="/employee/apply" element={<ApplyNoDue />} />
          <Route path="/employee/requests" element={<RequestHistory />} />
          <Route path="/employee/certificate" element={<Certificate />} />
          <Route
  path="/employee/profile"
  element={<Profile />}
/>
        </Route>
               <Route
  path="/change-password"
  element={<ChangePassword />}
/>


        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
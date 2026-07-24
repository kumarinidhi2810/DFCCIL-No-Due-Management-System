import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function ProtectedRoute({ menuItems }) {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  //AUTH CHECK
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout
      user={user}
      menuItems={menuItems}
    >
      <Outlet />
    </DashboardLayout>
  );
}

export default ProtectedRoute;
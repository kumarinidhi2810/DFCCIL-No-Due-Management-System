import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export const menuConfig = {
  superAdmin: [
    {
      title: "Dashboard",
      path: "/super-admin/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      title: "Departments",
      path: "/super-admin/departments",
      icon: <ApartmentRoundedIcon />,
    },
    {
      title: "Employees",
      path: "/super-admin/department-admins",
      icon: <PeopleRoundedIcon />,
    },
    {
  title: "Providers",
  path: "/super-admin/providers",
  icon: <PeopleRoundedIcon />,
},
    {
      title: "Reports",
      path: "/super-admin/reports",
      icon: <AssessmentRoundedIcon />,
    },
    {
      title: "Profile",
      path: "/super-admin/profile",
      icon: <PersonRoundedIcon />,
    },
    {
      title: "Logout",
      path: "/",
      icon: <LogoutRoundedIcon />,
    },
  ],

  departmentAdmin: [
    {
      title: "Dashboard",
      path: "/department/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      title: "Services",
      path: "/department/services",
      icon: <MiscellaneousServicesRoundedIcon />,
    },
    {
      title: "Employees",
      path: "/department/employees",
      icon: <BadgeRoundedIcon />,
    },
    {
      title: "Service Providers",
      path: "/department/providers",
      icon: <PeopleRoundedIcon />,
    },
    {
      title: "Requests",
      path: "/department/requests",
      icon: <AssignmentRoundedIcon />,
    },
    {
      title: "Profile",
      path: "/department/profile",
      icon: <PersonRoundedIcon />,
    },
    {
      title: "Logout",
      path: "/",
      icon: <LogoutRoundedIcon />,
    },
  ],

  provider: [
    {
      title: "Dashboard",
      path: "/provider/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      title: "Pending Requests",
      path: "/provider/pending",
      icon: <AssignmentRoundedIcon />,
    },
    {
      title: "Profile",
      path: "/provider/profile",
      icon: <PersonRoundedIcon />,
    },
    {
      title: "Logout",
      path: "/",
      icon: <LogoutRoundedIcon />,
    },
  ],

  employee: [
    {
      title: "Dashboard",
      path: "/employee/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      title: "Apply No Due",
      path: "/employee/apply",
      icon: <AssignmentRoundedIcon />,
    },
    {
      title: "My Requests",
      path: "/employee/requests",
      icon: <AssessmentRoundedIcon />,
    },
    {
      title: "Profile",
      path: "/employee/profile",
      icon: <PersonRoundedIcon />,
    },
    {
      title: "Logout",
      action:"logout",
      icon: <LogoutRoundedIcon />,
    },
  ],
};
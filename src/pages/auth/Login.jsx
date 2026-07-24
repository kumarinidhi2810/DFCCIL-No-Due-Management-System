import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import train from "../../assets/images/train.jpg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/images/dfccil-logo.png";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = () => {
  const email = form.email.toLowerCase();

  let user = null;
  let route = "";

  // Super Admin
  if (email === "admin@dfccil.com" && form.password === "1234") {
    user = {
      id: "U1",
      name: "Admin",
      email,
      role: "superAdmin",
      departmentId: null,
    };
    route = "/super-admin/dashboard";
  }

  // IT Admin
  else if (email === "it@dfccil.com" && form.password === "1234") {
    user = {
      id: "DA01",
      name: "IT Admin",
      email,
      role: "departmentAdmin",
      departmentId: "D01",
    };
    route = "/department/dashboard";
  }

  // HR Admin
  else if (email === "hr@dfccil.com" && form.password === "1234") {
    user = {
      id: "DA02",
      name: "HR Admin",
      email,
      role: "departmentAdmin",
      departmentId: "D02",
    };
    route = "/department/dashboard";
  }

  // Finance Admin
  else if (email === "finance@dfccil.com" && form.password === "1234") {
    user = {
      id: "DA03",
      name: "Finance Admin",
      email,
      role: "departmentAdmin",
      departmentId: "D03",
    };
    route = "/department/dashboard";
  }

  else {
    const providers =
      JSON.parse(localStorage.getItem("providers")) || [];

    const provider = providers.find(
      (p) =>
        p.email.toLowerCase() === email &&
        p.password === form.password
    );

    if (provider) {
      user = {
        id: provider.id,
        providerId: provider.providerId,
        name: provider.name,
        email: provider.email,
        departmentId: provider.departmentId,
        role: "provider",
      };

      route = "/provider/dashboard";
    } else {
      const employees =
        JSON.parse(localStorage.getItem("employees")) || [];

      const employee = employees.find(
        (emp) =>
          emp.email.toLowerCase() === email &&
          emp.password === form.password
      );

      if (employee) {
        user = {
          id: employee.id,
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          designation: employee.designation,
          departmentId: employee.departmentId,
          role: "employee",
        };

        route = "/employee/dashboard";
      } else {
        alert("Invalid Email or Password");
        return;
      }
    }
  }

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", "demo-token");
  navigate(route);

};




  return (
   <Grid
  container
  sx={{
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#D90429 0%,#C3002F 45%,#97001C 100%)",
    overflow: "hidden",
  }}
>

      {/* Left Panel */}
      <Grid
  size={{ xs: 0, md: 7 }}
  sx={{
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg,#D90429 0%,#C3002F 45%,#97001C 100%)",
    color: "#fff",
  }}
>
  <Box
    sx={{
      position: "absolute",
      width: 700,
      height: 700,
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,.08)",
      top: -280,
      left: -280,
    }}
  />

  <Box
    sx={{
      position: "absolute",
      width: 500,
      height: 500,
      borderRadius: "50%",
      border: "1px solid rgba(255,255,255,.05)",
      bottom: -180,
      right: -180,
    }}
  />

  <img
    src={logo}
    alt="logo"
    style={{
      width: 220,
      marginBottom: 35,
      filter: "drop-shadow(0 10px 30px rgba(0,0,0,.25))",
    }}
  />

  <Typography
    variant="h2"
    fontWeight="bold"
  >
    DFCCIL
  </Typography>

  <Typography
    mt={2}
    fontWeight={600}
    fontSize={38}
  >
    No Due Management System
  </Typography>

  <Typography
    mt={3}
    sx={{
      width: 520,
      textAlign: "center",
      fontSize: 18,
      color: "rgba(255,255,255,.9)",
    }}
  >
    Dedicated Freight Corridor Corporation of India Limited
  </Typography>
  <Box
    component="img"
    src={train}
    sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        opacity: .18
    }}
/>
</Grid>

      {/* Right Panel */}

      <Grid
        item
        xs={12}
        size={{ xs: 12, md: 5 }}
        sx={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:"transparent"
}}
      >
   <Paper
elevation={0}
sx={{
width:520,
p:6,
borderRadius:"26px",
background:"rgba(255,255,255,.96)",
backdropFilter:"blur(8px)",
boxShadow:"0 25px 70px rgba(0,0,0,.20)"
}}
>
     <Box
  textAlign="left"
  mb={4}
>
  <img
src={logo}
style={{
width:55,
marginBottom:18
}}
/>

  <Typography
fontSize={54}
fontWeight={700}
>
Welcome Back
</Typography>

  <Typography
    
    sx={{
mb:2,
"& .MuiOutlinedInput-root":{
height:58,
borderRadius:"12px",
background:"#fff"
}
}}
  >
    Sign in to access your account
  </Typography>
</Box>     
          <Box
  component="form"
  onSubmit={(e) => {
    e.preventDefault();
    handleLogin();
  }}
>

 <TextField
  fullWidth
  margin="normal"
  label="Email Address"
  name="email"
  value={form.email}
  onChange={handleChange}
  sx={{
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      height: 56,
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <EmailOutlinedIcon color="action" />
      </InputAdornment>
    ),
  }}
/>

<TextField
  fullWidth
  margin="normal"
  label="Password"
  name="password"
  type={showPassword ? "text" : "password"}
  value={form.password}
  onChange={handleChange}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      height: 56,
    },
  }}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <LockOutlinedIcon color="action" />
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <VisibilityOff />
            ) : (
              <Visibility />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  }}
/>
<Box
  sx={{
    mt: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }}
>
  <FormControlLabel
    sx={{ m: 0 }}
    control={<Checkbox size="small" />}
    label="Remember Me"
  />

  <Link
  component={RouterLink}
  to="/forgot-password"
  underline="none"
  sx={{
    color: "#D90429",
    fontWeight: 600,
    fontSize: 14,
    ml: "auto",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  }}
>
  Forgot Password?
</Link>
</Box>
<Button
fullWidth
variant="contained"
type="submit"
sx={{
mt:3,
height:56,
borderRadius:"12px",
fontWeight:700,
fontSize:18,
background:"#D90429",
boxShadow:"none",
"&:hover":{
background:"#b50024"
}
}}
>
SIGN IN
</Button>
</Box>
<Box
display="flex"
alignItems="center"
mt={5}
>

<Box
sx={{
flex:1,
height:1,
background:"#e5e7eb"
}}
/>

<Typography
  mt={4}
  align="center"
  variant="body2"
  color="text.secondary"
>
  DFCCIL No Due Management System
</Typography>

<Box
sx={{
flex:1,
height:1,
background:"#e5e7eb"
}}
/>

</Box>
         

        </Paper>
      </Grid>

    </Grid>
  );

}
export default Login;
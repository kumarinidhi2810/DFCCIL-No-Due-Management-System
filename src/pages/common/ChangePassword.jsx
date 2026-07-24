import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setSeverity("error");
      setMessage("Please fill all fields.");
      setOpen(true);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setSeverity("error");
      setMessage("New Password and Confirm Password do not match.");
      setOpen(true);
      return;
    }

    // Backend aane par API call hogi

    setSeverity("success");
    setMessage("Password changed successfully.");
    setOpen(true);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
      }}
    >
      <Paper
        sx={{
          width: 500,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Change Password
        </Typography>

        <TextField
          fullWidth
          type="password"
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.2,
          }}
          onClick={handleSubmit}
        >
          Update Password
        </Button>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ChangePassword;
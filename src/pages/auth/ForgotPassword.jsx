import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function ForgotPassword() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f7fb",
      }}
    >
      <Paper
        sx={{
          width: 420,
          p: 5,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,.15)",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Forgot Password
        </Typography>

        <Typography color="text.secondary" mt={1} mb={3}>
          Enter your registered email address.
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5,
            bgcolor: "#D90429",
            "&:hover": {
              bgcolor: "#b30022",
            },
          }}
        >
          Send Reset Link
        </Button>

        <Box textAlign="center" mt={3}>
          <Link component={RouterLink} to="/" underline="hover">
            Back to Login
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
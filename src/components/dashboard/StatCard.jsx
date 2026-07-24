import { Paper, Typography, Box } from "@mui/material";

function StatCard({
  title,
  value,
  icon,
  color,
  onClick,
}) {
  return (
  <Paper
  elevation={0}
  onClick={onClick}
sx={{
  p: 3,
  borderRadius: 4,
  cursor: onClick ? "pointer" : "default",
  border: "1px solid #E5E7EB",
  background: "#fff",
  transition: "all .3s ease",

  "&:hover": onClick
    ? {
        transform: "translateY(-6px)",
        boxShadow: "0 12px 30px rgba(37,99,235,.15)",
        borderColor: color,
      }
    : {},

  "&:active": onClick
    ? {
        transform: "scale(.98)",
      }
    : {},
}}
>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            color="text.secondary"
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            mt={1}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
boxShadow: `0 8px 18px ${color}55`,
            width: 60,
            height: 60,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
}

export default StatCard;
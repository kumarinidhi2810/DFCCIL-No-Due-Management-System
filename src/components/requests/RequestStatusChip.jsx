import { Chip } from "@mui/material";

function RequestStatusChip({ status }) {
  let bgColor = "#FFF3E0";
  let textColor = "#EF6C00";

  if (status === "Approved") {
    bgColor = "#E8F5E9";
    textColor = "#2E7D32";
  }

  if (status === "Rejected") {
    bgColor = "#FDECEA";
    textColor = "#D32F2F";
  }

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: bgColor,
        color: textColor,
        fontWeight: 600,
        borderRadius: "8px",
        minWidth: 90,
      }}
    />
  );
}

export default RequestStatusChip;
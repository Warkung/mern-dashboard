import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box, Typography } from "@mui/material";

export default function Title({ collapsed }: any) {
  return (
    <div>
      <Box display="flex" alignItems="center" gap="8px">
        <DashboardIcon />
        <Typography
          variant="h6"
          fontWeight={700}
          display={collapsed ? "none" : "block"}
        >
          Dashboard
        </Typography>
      </Box>
    </div>
  );
}

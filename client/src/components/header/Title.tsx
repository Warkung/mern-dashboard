import LogoDevIcon from "@mui/icons-material/LogoDev";
import { Box, Button, Link, Typography } from "@mui/material";


export default function Title({ collapsed }: any) {
  return (
    <div>
      <Link
        href="/"
        underline="none"
        display="flex"
        alignItems="center"
        gap="8px"
      >
        <LogoDevIcon fontSize="large" />
        <Typography
          variant="h6"
          fontWeight={700}
          color=""
          display={collapsed ? "none" : "block"}
        >
          LOGO
        </Typography>
      </Link>
    </div>
  );
}

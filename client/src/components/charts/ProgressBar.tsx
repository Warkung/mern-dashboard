import { Box, Stack, Typography } from "@mui/material";
import { ProgressBarType } from "../../interfaces/home";

export default function ProgressBar({
  title,
  percentage,
  color,
}: ProgressBarType) {
  return (
    <Box width={"100%"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16} fontWeight={600} color="#11142d">
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight={600} color="#11142d">
          {percentage}%
        </Typography>
      </Stack>
      <Box
        mt={2}
        position={"relative"}
        width={"100%"}
        height={"8px"}
        borderRadius={1}
        bgcolor={"#e4e8ef"}
      >
        <Box
          position={"absolute"}
          width={`${percentage}%`}
          height={"8px"}
          borderRadius={1}
          bgcolor={color}
        ></Box>
      </Box>
    </Box>
  );
}

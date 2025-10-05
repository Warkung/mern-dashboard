import { Box, Stack, Typography } from "@mui/material";
import { propertyReferralsInfo } from "./ChartConfig";
import ProgressBar from "./ProgressBar";

export default function PropertyReferral() {
  return (
    <Box
      p={4}
      bgcolor={"#fcfcfc"}
      minWidth={"300px"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"15px"}
    >
      <Typography fontSize={15} fontWeight={600} color="#11142d">
        Property Referral
      </Typography>
      <Stack my={"20px"} direction={"column"} gap={4}>
        {propertyReferralsInfo.map((bar, index) => {
          return <ProgressBar key={index} {...bar} />;
        })}
      </Stack>
    </Box>
  );
}
